"use server";

import { pool } from "@/app/models/db/lib/index";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/models/db/authOptions";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import {ProjectData} from "@/types/index"


type UserPayload = {
  user_id: string;
  name: string;
  role: string;
  email?: string;
};


interface SessionWithToken {
  user?: {
    name?: string;
    email?: string;
    token?: string;
  };
}



export async function addProject(formData: FormData): Promise<ProjectData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;

  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to add a project");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const title = formData.get("title")?.toString().trim() || "";
  const title_ar = formData.get("title_ar")?.toString().trim() || "";
  const description = formData.get("description")?.toString().trim() || "";
  const description_ar =
    formData.get("description_ar")?.toString().trim() || "";
  const image = formData.get("image")?.toString().trim() || "";
  const category_name = formData.get("category_name")?.toString().trim() || "";
  const is_recent = formData.get("is_recent") === "true" ? true : false;

  if (!title || !title_ar || !description || !description_ar || !image || !category_name)
    throw new Error("All required fields must be provided");


  const categoryResult = await pool.query<{ id: string }>(
    `SELECT id FROM categories WHERE name=$1 OR name_ar=$1 LIMIT 1`,
    [category_name]
  );

  if (!categoryResult.rows[0])
    throw new Error("Category not found. Please provide a valid category name.");

  const category_id = categoryResult.rows[0].id;

  const result = await pool.query<ProjectData>(
    `INSERT INTO projects (title, title_ar, description, description_ar, image, category_id, is_recent)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [title, title_ar, description, description_ar, image, category_id, is_recent]
  );


  return result.rows[0];
}

export async function getProjectById(id: string): Promise<ProjectData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;

  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to get a project");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const result = await pool.query<ProjectData>(`SELECT * FROM projects WHERE id = $1`, [id]);

  if (!result.rows[0]) throw new Error("Project not found");
  return result.rows[0];
}

export async function editProject(data: {
  id: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  image?: string | null;
  category_name?: string;
  is_recent?: boolean;
}): Promise<ProjectData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;

  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to edit a project");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const { id, title, title_ar, description, description_ar, image, category_name, is_recent } = data;

  if (!title || !title_ar || !description || !description_ar)
    throw new Error("All required fields must be provided");

  let category_id: string | null = null;
  if (category_name) {
    const categoryResult = await pool.query<{ id: string }>(
      `SELECT id FROM categories WHERE name=$1 OR name_ar=$1 LIMIT 1`,
      [category_name]
    );

    if (!categoryResult.rows[0])
      throw new Error("Category not found. Please provide a valid category name.");

    category_id = categoryResult.rows[0].id;
  }

  const result = await pool.query<ProjectData>(
    `UPDATE projects 
     SET title=$1, title_ar=$2, description=$3, description_ar=$4, image=$5, category_id=COALESCE($6, category_id), is_recent=COALESCE($7, is_recent)
     WHERE id=$8
     RETURNING *`,
    [title, title_ar, description, description_ar, image ?? null, category_id, is_recent, id]
  );

  if (!result.rows[0]) throw new Error("Project not found or update failed");
  return result.rows[0];
}

export async function deleteProject(id: string) {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;

  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to delete a project");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  await pool.query(`DELETE FROM projects WHERE id = $1`, [id]);
  revalidatePath("/projects");
}


export async function getCategories(): Promise<{ id: string; name: string; name_ar: string }[]> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;

  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;

    // هنا نتحقق إن المستخدم admin
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to access categories");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const result = await pool.query<{ id: string; name: string; name_ar: string }>(
    `SELECT id, name, name_ar FROM categories ORDER BY name`
  );

  return result.rows;
}
