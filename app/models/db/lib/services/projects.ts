import { pool } from "../index";
import { categoryWithProject } from "@/types/index";

type Locale = "en" | "ar";

// جلب كل المشاريع مع معلومات التصنيف
export const getAllProjects = async (): Promise<categoryWithProject[]> => {
  const query = `
    SELECT
      c.id AS category_id,
      c.name AS category_name,
      c.name_ar AS category_name_ar,
      c.created_at AS category_created_at,

      p.id AS project_id,
      p.title AS project_title,
      p.title_ar AS project_title_ar,
      p.description AS project_description,
      p.description_ar AS project_description_ar,
      p.image AS project_image,
      p.is_recent AS project_is_recent,
      p.created_at AS project_created_at

    FROM categories c
    LEFT JOIN projects p
      ON c.id = p.category_id

    ORDER BY c.id, p.id;
  `;

  const result = await pool.query<categoryWithProject>(query);
  return result.rows;
};

// جلب المشاريع مترجمة حسب اللغة مع الاحتفاظ بالحقول الأصلية
export const getProjectsByLocale = async (locale: Locale): Promise<categoryWithProject[]> => {
  const rows = await getAllProjects();

  return rows.map((item) => ({
    ...item, // كل الحقول الأصلية
    category_name: locale === "ar" ? item.category_name_ar : item.category_name,
    project_title: locale === "ar" ? item.project_title_ar : item.project_title,
    project_description: locale === "ar" ? item.project_description_ar : item.project_description,
  }));
};

// تنسيق المشاريع حسب التصنيف وإضافة تبويب "All"
export const formatCategories = (
  data: categoryWithProject[],
  locale: Locale
) => {
  const map = new Map<
    string,
    { name: string; cards: { id: number; title: string; image: string }[] }
  >();

  data.forEach((row) => {
    if (!map.has(row.category_name)) {
      map.set(row.category_name, { name: row.category_name, cards: [] });
    }
    if (row.project_id) {
      map.get(row.category_name)!.cards.push({
        id: row.project_id,
        title: row.project_title || "",
        image: row.project_image || "/default.jpg",
      });
    }
  });

  const allCards = data
    .filter((p) => p.project_id)
    .map((p) => ({
      id: p.project_id!,
      title: p.project_title!,
      image: p.project_image || "/default.jpg",
    }));

  const allName = locale === "ar" ? "الكل" : "All";

  return [
    { name: allName, cards: allCards },
    ...Array.from(map.values()),
  ];
};

// جلب مشروع واحد حسب id و locale
export const getProjectByIdByLocale = async (
  id: string,
  locale: Locale
) => {
  const result = await pool.query<categoryWithProject>(
    `
    SELECT
      c.id AS category_id,
      c.name AS category_name,
      c.name_ar AS category_name_ar,
      p.id AS project_id,
      p.title AS project_title,
      p.title_ar AS project_title_ar,
      p.description AS project_description,
      p.description_ar AS project_description_ar,
      p.image AS project_image,
      p.is_recent AS project_is_recent,
      p.created_at AS project_created_at
    FROM projects p
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE p.id = $1
    `,
    [id]
  );

  const project = result.rows[0];
  if (!project) return null;

  return {
    ...project,
    category_name: locale === "ar" ? project.category_name_ar : project.category_name,
    project_title: locale === "ar" ? project.project_title_ar : project.project_title,
    project_description: locale === "ar" ? project.project_description_ar : project.project_description,
  };
};
