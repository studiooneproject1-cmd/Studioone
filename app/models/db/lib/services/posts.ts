import { pool } from "../index";
import { postData } from "@/types/index";

type Locale = "en" | "ar";



export const getAllPosts = async (): Promise<postData[]> => {
  const result = await pool.query<postData>("SELECT * FROM posts");
  return result.rows;
};

export const getPostByName = async (name: string): Promise<postData | null> => {
  const query = `SELECT * FROM posts WHERE name = $1 LIMIT 1`;
  const result = await pool.query(query, [name]);

  if (result.rows.length === 0) return null;
  return result.rows[0] as postData;
};

export const getPostByLocale = async (
  name: string,
  locale: Locale
): Promise<postData | null> => {
  const post = await getPostByName(name);

  if (!post) return null;

  return {
    ...post,
    name: locale === "ar" ? post.name_ar : post.name,
    description: locale === "ar" ? post.description_ar : post.description,
    small_header: locale === "ar" ? post.small_header_ar : post.small_header,
    button_name: locale === "ar" ? post.button_name_ar : post.button_name,
  };
};
