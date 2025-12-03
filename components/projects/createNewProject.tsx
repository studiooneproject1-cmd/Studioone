"use client";

import { type ProjectData } from "@/types";
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

interface Props {
  action: (formData: FormData) => Promise<any>;
  categories: { id: string; name: string; name_ar: string }[];
}

export default function AddProjectForm({ action, categories }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<ProjectData & { category_name?: string }>({
    title: "",
    title_ar: "",
    description: "",
    description_ar: "",
    image: "",
    category_id: "",
    category_name: "",
    is_recent: false,
  });

  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;


    if (name === "category_id") {
      const selected = categories.find(cat => cat.id === value);
      setForm(prev => ({
        ...prev,
        category_id: value,
        category_name: selected ? selected.name : "",
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, is_recent: e.target.checked }));
  };

  const handleUploadComplete = (url: string) =>
    setForm(prev => ({ ...prev, image: url }));

  const handleUploadError = (error: Error) => {
    console.error(error);
    setToast({ message: `Upload failed: ${error.message}`, type: "error" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageDelete = () => setForm(prev => ({ ...prev, image: "" }));

  const handleFormSubmit = () => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("title_ar", form.title_ar);
        formData.append("description", form.description);
        formData.append("description_ar", form.description_ar);
        formData.append("image", form.image ?? "");
        formData.append("category_name", form.category_name ?? ""); 
        formData.append("is_recent", form.is_recent ? "true" : "false");

        await action(formData);

        setToast({ message: "Project added successfully!", type: "success" });
        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/projects");
        }, 1500);
      } catch (error) {
        console.error(error);
        setToast({ message: "Failed to add project.", type: "error" });
        setTimeout(() => setToast(null), 3000);
        console.log(form, categories);
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[95vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Project</h1>
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
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new project.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Title EN */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Title (EN)
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

            {/* Title AR */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Title (AR)
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

            {/* Description EN */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Description (EN)
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
                required
              />
            </div>

            {/* Description AR */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Description (AR)
              </label>
              <textarea
                name="description_ar"
                value={form.description_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
                required
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Category
              </label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} / {cat.name_ar}
                  </option>
                ))}
              </select>
            </div>

            {/* Is Recent */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                name="is_recent"
                checked={form.is_recent}
                onChange={handleCheckboxChange}
                className="w-5 h-5 border-black rounded"
              />
              <label className="text-base text-black">
                <span className="text-red-500 text-sm">*</span> Recent Project
              </label>
            </div>

            {/* Image */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Project Image</label>
              <ImageUploader
                endpoint="projects"
                initialImageUrl={form.image}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                onDelete={handleImageDelete}
              />
            </div>

            {/* Buttons */}
            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  onClick={() => router.replace("/admin/dashboard/projects")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500"
                  disabled={isPending}
                >
                  {isPending ? "Adding..." : "Add Project"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Toast */}
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
