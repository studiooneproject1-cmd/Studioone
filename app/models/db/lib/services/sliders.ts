import { pool } from "../index";
import { slidersData } from "@/types/index";


type Locale = "en" | "ar";


export const getAllSliders = async (): Promise<slidersData[]> => {
  const result = await pool.query<slidersData>("SELECT * FROM sliders");
  return result.rows;
};


export const getSlidersByLocale = async (locale: Locale): Promise<slidersData[]> => {
  const sliders = await getAllSliders();
  return sliders.map(slide => ({
    ...slide,
    title: locale === "ar" ? slide.title_ar : slide.title,
    description: locale === "ar" ? slide.description_ar : slide.description,
    button_name: locale === "ar" ? slide.button_name_ar : slide.button_name,
  }));
};
