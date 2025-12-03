import { pool } from "../index";
import { servicesData } from "@/types/index";

type Locale = "en" | "ar";

// جلب كل الخدمات
export const getAllServices = async (): Promise<servicesData[]> => {
  const result = await pool.query<servicesData>("SELECT * FROM services");
  return result.rows;
};

// جلب كل الخدمات حسب اللغة
export const getServicesByLocale = async (
  locale: Locale
): Promise<servicesData[]> => {
  const sliders = await getAllServices();
  return sliders.map((service) => ({
    ...service,
    name: locale === "ar" ? service.name_ar : service.name,
    description: locale === "ar" ? service.description_ar : service.description,
    short_description:
      locale === "ar"
        ? service.short_description_ar
        : service.short_description,
  }));
};

// جلب خدمة واحدة حسب ID ولغة المستخدم
export const getServiceByIdByLocale = async (
  id: string,
  locale: Locale
): Promise<servicesData | null> => {
  const result = await pool.query<servicesData>(
    "SELECT * FROM services WHERE id = $1",
    [id]
  );

  const service = result.rows[0];
  if (!service) return null;

  return {
    ...service,
    name: locale === "ar" ? service.name_ar : service.name,
    description: locale === "ar" ? service.description_ar : service.description,
    short_description:
      locale === "ar"
        ? service.short_description_ar
        : service.short_description,
  };
};
