"use server";

import { pool } from "@/app/models/db/lib/index";
import { slidersData } from "@/types/index";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/models/db/authOptions";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";

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

export async function addSlider(formData: FormData): Promise<slidersData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;

  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to add a slider");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const title = formData.get("title")?.toString().trim() || "";
  const title_ar = formData.get("title_ar")?.toString().trim() || "";
  const description = formData.get("description")?.toString().trim() || "";
  const description_ar =
    formData.get("description_ar")?.toString().trim() || "";
  const button_link = formData.get("button_link")?.toString().trim() || "";
  const button_name = formData.get("button_name")?.toString().trim() || "";
  const button_name_ar =
    formData.get("button_name_ar")?.toString().trim() || "";
  const image = formData.get("image")?.toString().trim() || "";

  if (
    !title ||
    !title_ar ||
    !description ||
    !description_ar ||
    !button_link ||
    !button_name ||
    !button_name_ar ||
    !image
  ) {
    throw new Error("All required fields must be provided");
  }

  const result = await pool.query<slidersData>(
    `INSERT INTO sliders 
     (title, title_ar, description, description_ar, button_link, button_name, button_name_ar, image)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [
      title,
      title_ar,
      description,
      description_ar,
      button_link,
      button_name,
      button_name_ar,
      image,
    ]
  );

  return result.rows[0];
}

export async function getSliderById(id: string): Promise<slidersData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to get a slider");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const result = await pool.query<slidersData>(
    `SELECT * FROM sliders WHERE id = $1`,
    [id]
  );
  if (!result.rows[0]) throw new Error("Slider not found");
  return result.rows[0];
}

export async function editSlider(data: {
  sliderId: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  button_link: string;
  button_name: string;
  button_name_ar: string;
  image?: string | null;
}): Promise<slidersData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to edit a slider");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const {
    sliderId,
    title,
    title_ar,
    description,
    description_ar,
    button_link,
    button_name,
    button_name_ar,
    image,
  } = data;

  if (
    !title ||
    !title_ar ||
    !description ||
    !description_ar ||
    !button_link ||
    !button_name ||
    !button_name_ar
  )
    throw new Error("All required fields must be provided");

  const result = await pool.query<slidersData>(
    `UPDATE sliders
     SET title=$1, title_ar=$2, description=$3, description_ar=$4,
         button_link=$5, button_name=$6, button_name_ar=$7, image=$8
     WHERE id=$9
     RETURNING *`,
    [
      title,
      title_ar,
      description,
      description_ar,
      button_link,
      button_name,
      button_name_ar,
      image ?? null,
      sliderId,
    ]
  );

  if (!result.rows[0]) throw new Error("Slider not found or update failed");

  return result.rows[0];
}

export async function deleteSlider(id: string) {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error(
        "Forbidden: You do not have permission to delete a slider"
      );
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  await pool.query(`DELETE FROM sliders WHERE id = $1`, [id]);
  revalidatePath("/sliders");
}
