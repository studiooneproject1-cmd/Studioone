"use client";

import { type slidersData } from "@/types";
import ImageUploader from "@/components/imageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { editSlider } from "@/app/models/db/lib/actions/sliders";

interface Props {
  slider: slidersData;
}

interface sliderFormState {
 title: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image: string | null;
  button_link: string;
  button_name: string;
  button_name_ar: string;
}

export default function EditSliderForm({ slider }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<sliderFormState>({
    title: slider.title ?? "",
  title_ar: slider.title_ar ?? "",
    description_en: slider.description ?? "",
    description_ar: slider.description_ar ?? "",
    image: slider.image ?? null,
    button_link: slider.button_link ?? "",
    button_name: slider.button_name ?? "",
    button_name_ar: slider.button_name_ar ?? "",
  });

  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadComplete = (url: string) => setForm(prev => ({ ...prev, image: url }));
  const handleUploadError = (error: Error) => {
    console.error(error);
    setToast({ message: `Upload failed: ${error.message}`, type: "error" });
    setTimeout(() => setToast(null), 3000);
  };
  const handleImageDelete = () => setForm(prev => ({ ...prev, image: null }));

  const handleFormSubmit = () => {
    startTransition(async () => {
      try {
        await editSlider({
          sliderId: slider.id!,
          title: form.title,
         title_ar: form.title_ar,
          description: form.description_en,
          description_ar: form.description_ar,
          image: form.image ?? null,
          button_link: form.button_link,
          button_name: form.button_name,
          button_name_ar: form.button_name_ar,
        });

        setToast({ message: "slider updated successfully!", type: "success" });
        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/slider");
        }, 1500);
      } catch (error) {
        console.error(error);
        setToast({ message: "Failed to update slider.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit slider</h1>
        <p className="text-xs md:text-base text-gray-600">ID: {slider.id}</p>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Edit Slider Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to update your Slider.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">

      
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Name (title Text EN)
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

        
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Name (title Text AR)
              </label>
              <input
                type="text"
                name="title_ar"
                value={form.title_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

            {/* DESCRIPTION EN */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> English Description
              </label>
              <textarea
                name="description_en"
                value={form.description_en}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
                required
              />
            </div>

            {/* DESCRIPTION AR */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Arabic Description
              </label>
              <textarea
                name="description_ar"
                value={form.description_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
                required
              />
            </div>

            {/* BUTTON LINK */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">Button Link</label>
              <input
                type="text"
                name="button_link"
                value={form.button_link}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
              />
            </div>

            {/* BUTTON NAME EN */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">Button Name (EN)</label>
              <input
                type="text"
                name="button_name"
                value={form.button_name}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
              />
            </div>

            {/* BUTTON NAME AR */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">Button Name (AR)</label>
              <input
                type="text"
                name="button_name_ar"
                value={form.button_name_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
              />
            </div>

            {/* IMAGE */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">slider Image</label>
              <ImageUploader
                endpoint="slider"
                initialImageUrl={form.image}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                onDelete={handleImageDelete}
              />
            </div>

            {/* BUTTONS */}
            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => router.replace("/admin/dashboard/slider")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500"
                  disabled={isPending}
                >
                  {isPending ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>

          </CardContent>
        </Card>
      </form>

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}
