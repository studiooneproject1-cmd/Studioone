"use client";
import { type servicesData } from "@/types";
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
}

export default function AddServicesForm({ action }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<servicesData>({
    name: "",
    name_ar: "",
    description: "",
    description_ar: "",
    image: "",
    short_description: "",
    short_description_ar: "",
  });

  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUploadComplete = (url: string) => {
    setForm({ ...form, image: url });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    setToast({ message: `Upload failed: ${error.message}`, type: "error" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageDelete = () => {
    setForm({ ...form, image: "" });
  };

  const handleFormSubmit = () => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("name_ar", form.name_ar);

        formData.append("description", form.description);
        formData.append("description_ar", form.description_ar);

        formData.append("short_description", form.short_description);
        formData.append("short_description_ar", form.short_description_ar);
      
        formData.append("image", form.image ?? "");

        await action(formData);

        setToast({ message: "service added successfully!", type: "success" });

        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/services");
        }, 1500);
      } catch (error) {
        console.error(error);
        setToast({ message: "Failed to add service.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[95vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New service</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>New service Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new service.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* name EN */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Name (title Text EN)
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white 
                w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

            {/* name AR */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Name (title Text AR)
              </label>
              <input
                type="text"
                name="name_ar"
                value={form.name_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white 
                w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> English Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white 
                w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
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
                className="border px-2 py-1 rounded border-black bg-white 
                w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
                required
              />
            </div>




             {/* SHORT DESCRIPTION */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span>Short English Description
              </label>
              <textarea
                name="short_description"
                value={form.short_description}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white 
                w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
                required
              />
            </div>

            {/* Short DESCRIPTION AR */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span>Short Arabic Description
              </label>
              <textarea
                name="short_description_ar"
                value={form.short_description_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white 
                w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[15vh] text-black"
                required
              />
            </div>

           

           

         

            {/* IMAGE */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1"></label>
              <ImageUploader
                endpoint="service"
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
                  onClick={() => router.replace("/admin/dashboard/service")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500"
                  disabled={isPending}
                >
                  {isPending ? "Adding..." : "Add service"}
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
