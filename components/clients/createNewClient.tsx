"use client";

import { type clientsData } from "@/types";
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

export default function AddClientForm({ action }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<clientsData>({
    name: "",
    name_ar: "",
    image: "",
  });

  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // تحديث الحقول النصية
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // تحديث الصورة بعد رفعها
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

  // إرسال الفورم
  const handleFormSubmit = () => {
    if (!form.name || !form.name_ar || !form.image) {
      setToast({ message: "All fields are required", type: "error" });
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("name_ar", form.name_ar);
        formData.append("image", form.image);

        await action(formData);

        setToast({ message: "Client added successfully!", type: "success" });

        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/clients");
        }, 1500);
      } catch (error) {
        console.error(error);
        setToast({ message: "Failed to add client.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      {/* العنوان */}
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[95vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Client</h1>
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
            <CardTitle>New Client Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new client.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">
            {/* Name EN */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Name (EN)
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

            {/* Name AR */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Name (AR)
              </label>
              <input
                type="text"
                name="name_ar"
                value={form.name_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

            {/* Image */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Client Image</label>
              <ImageUploader
                endpoint="ourClients"
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
                  onClick={() => router.replace("/admin/dashboard/clients")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500"
                  disabled={isPending}
                >
                  {isPending ? "Adding..." : "Add Client"}
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
