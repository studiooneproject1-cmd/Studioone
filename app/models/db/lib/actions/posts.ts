"use server";

import { pool } from "@/app/models/db/lib/index";
import { postData } from "@/types/index";
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


export async function getPostById(id: string): Promise<postData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;

  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to get a post");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const result = await pool.query<postData>(
    `SELECT * FROM posts WHERE id = $1`,
    [id]
  );

  if (!result.rows[0]) throw new Error("Post not found");

  return result.rows[0];
}


export async function editPost(data: {
  postId: string;
  small_header: string;
  small_header_ar: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  button_name: string;
  button_name_ar: string;
  button_link: string;
  image: string;
}): Promise<postData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;

  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to edit a post");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const {
    postId,
    small_header,
    small_header_ar,
    name,
    name_ar,
    description,
    description_ar,
    button_name,
    button_name_ar,
    button_link,
    image,
  } = data;

  if (
    !small_header ||
    !small_header_ar ||
    !name ||
    !name_ar ||
    !description ||
    !description_ar ||
    !button_name ||
    !button_name_ar ||
    !button_link ||
    !image
  ) {
    throw new Error("All required fields must be provided");
  }

  const result = await pool.query<postData>(
    `UPDATE posts
     SET small_header=$1, small_header_ar=$2, 
         name=$3, name_ar=$4, 
         description=$5, description_ar=$6,
         button_name=$7, button_name_ar=$8,
         button_link=$9, image=$10
     WHERE id=$11
     RETURNING *`,
    [
      small_header,
      small_header_ar,
      name,
      name_ar,
      description,
      description_ar,
      button_name,
      button_name_ar,
      button_link,
      image,
      postId,
    ]
  );

  if (!result.rows[0]) throw new Error("Post not found or update failed");

  return result.rows[0];
}


export async function deletePost(id: string) {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;

  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error(
        "Forbidden: You do not have permission to delete a post"
      );
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  await pool.query(`DELETE FROM posts WHERE id = $1`, [id]);
  revalidatePath("/posts");
}
