"use server";

import { pool } from "@/app/models/db/lib/index";
import type { clientsData } from "@/types/index";
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

export async function addClient(formData: FormData): Promise<clientsData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;

  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to add a client");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const name = formData.get("name")?.toString().trim() || "";
  const name_ar = formData.get("name_ar")?.toString().trim() || "";
  const image = formData.get("image")?.toString().trim() || "";

  if (!name || !name_ar || !image)
    throw new Error("All required fields must be provided");

  const result = await pool.query<clientsData>(
    `INSERT INTO clients (name, name_ar, image) VALUES ($1, $2, $3) RETURNING *`,
    [name, name_ar, image]
  );

  return result.rows[0];
}

export async function getClientById(id: string): Promise<clientsData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;

  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to get a client");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const result = await pool.query<clientsData>(
    `SELECT * FROM clients WHERE id = $1`,
    [id]
  );

  if (!result.rows[0]) throw new Error("Client not found");
  return result.rows[0];
}

export async function editClient(data: {
  id: string;
  name: string;
  name_ar: string;
  image?: string | null;
}): Promise<clientsData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;

  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to edit a client");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const { id, name, name_ar, image } = data;

  if (!name || !name_ar)
    throw new Error("All required fields must be provided");

  const result = await pool.query<clientsData>(
    `UPDATE clients SET name=$1, name_ar=$2, image=$3 WHERE id=$4 RETURNING *`,
    [name, name_ar, image ?? null, id]
  );

  if (!result.rows[0]) throw new Error("Client not found or update failed");
  return result.rows[0];
}

export async function deleteClient(id: string) {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;
  let payload: UserPayload;

  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error(
        "Forbidden: You do not have permission to delete a client"
      );
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  await pool.query(`DELETE FROM clients WHERE id = $1`, [id]);
  revalidatePath("/clients");
}
