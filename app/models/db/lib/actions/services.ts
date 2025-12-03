"use server";

import { pool } from "@/app/models/db/lib/index";
import { servicesData } from "@/types/index";
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

export async function addService(formData: FormData): Promise<servicesData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;

  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to add a service");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const name = formData.get("name")?.toString().trim() || "";
  const name_ar = formData.get("name_ar")?.toString().trim() || "";
  const description = formData.get("description")?.toString().trim() || "";
  const description_ar =
    formData.get("description_ar")?.toString().trim() || "";
  const short_description =
    formData.get("short_description")?.toString().trim() || "";
  const short_description_ar =
    formData.get("short_description_ar")?.toString().trim() || "";
  const image = formData.get("image")?.toString().trim() || "";

  if (
    !name ||
    !name_ar ||
    !description ||
    !description_ar ||
    !short_description ||
    !short_description_ar ||
    !image
  ) {
    throw new Error("All required fields must be provided");
  }

  const result = await pool.query<servicesData>(
    `INSERT INTO services 
     (name, name_ar, description, description_ar, short_description, short_description_ar, image)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [
      name,
      name_ar,
      description,
      description_ar,
      short_description,
      short_description_ar,
      image,
    ]
  );

  return result.rows[0];
}

export async function getServiceById(id: string): Promise<servicesData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;

  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error("Forbidden: You do not have permission to get a service");
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const result = await pool.query<servicesData>(
    `SELECT * FROM services WHERE id = $1`,
    [id]
  );

  if (!result.rows[0]) throw new Error("Service not found");

  return result.rows[0];
}

export async function editService(data: {
  serviceId: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  short_description: string;
  short_description_ar: string;
  image?: string | null;
}): Promise<servicesData> {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;

  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error(
        "Forbidden: You do not have permission to edit a service"
      );
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  const {
    serviceId,
    name,
    name_ar,
    description,
    description_ar,
    short_description,
    short_description_ar,
    image,
  } = data;

  if (
   
    !name ||
    !name_ar ||
    !description ||
    !description_ar ||
    !short_description ||
    !short_description_ar
  ) {
    throw new Error("All required fields must be provided");
  }

  const result = await pool.query<servicesData>(
    `UPDATE services
     SET name=$1, name_ar=$2, description=$3, description_ar=$4,
         short_description=$5, short_description_ar=$6, image=$7
     WHERE id=$8
     RETURNING *`,
    [
      name,
      name_ar,
      description,
      description_ar,
      short_description,
      short_description_ar,
      image ?? null,
      serviceId,
    ]
  );

  if (!result.rows[0]) throw new Error("Service not found or update failed");

  return result.rows[0];
}

export async function deleteService(id: string) {
  const session = (await getServerSession(authOptions)) as SessionWithToken;
  if (!session?.user?.token) throw new Error("Unauthorized");

  const token = session.user.token;

  let payload: UserPayload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as UserPayload;
    if (payload.role !== "admin")
      throw new Error(
        "Forbidden: You do not have permission to delete a service"
      );
  } catch (err) {
    console.error("JWT verify error:", err);
    throw new Error("Invalid token");
  }

  await pool.query(`DELETE FROM services WHERE id = $1`, [id]);
  revalidatePath("/services");
}
