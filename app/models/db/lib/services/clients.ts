import { pool } from "../index";
import { clientsData } from "@/types/index";

type Locale = "en" | "ar";

export const getAllClients = async (): Promise<clientsData[]> => {
  const result = await pool.query<clientsData>("SELECT * FROM clients");
  return result.rows;
};

export const getClientsByLocale = async (
  locale: Locale
): Promise<clientsData[]> => {
  const clientsData = await getAllClients();
  return clientsData.map((client) => ({
    ...client,
    name: locale === "ar" ? client.name_ar : client.name,
  
  }));
};
