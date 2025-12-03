"use client";

import { type postData } from "@/types";
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
import { editPost } from "@/app/models/db/lib/actions/posts"; // تأكد من المسار الصحيح

interface Props {
  post: postData;
}

interface postFormState {
  small_header: string;
  small_header_ar: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  button_name: string;
  button_name_ar: string;
  button_link: string;
  image: string | null;
}

export default function EditPostForm({ post }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<postFormState>({
    small_header: post.small_header ?? "",
    small_header_ar: post.small_header_ar ?? "",
    name: post.name ?? "",
    name_ar: post.name_ar ?? "",
    description: post.description ?? "",
    description_ar: post.description_ar ?? "",
    button_name: post.button_name ?? "",
    button_name_ar: post.button_name_ar ?? "",
    button_link: post.button_link ?? "",
    image: post.image ?? null,
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
        await editPost({
          postId: post.id.toString(),
          small_header: form.small_header,
          small_header_ar: form.small_header_ar,
          name: form.name,
          name_ar: form.name_ar,
          description: form.description,
          description_ar: form.description_ar,
          button_name: form.button_name,
          button_name_ar: form.button_name_ar,
          button_link: form.button_link,
          image: form.image?? "",
        });

        setToast({ message: "Post updated successfully!", type: "success" });
        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/posts");
        }, 1500);
      } catch (error) {
        console.error(error);
        setToast({ message: "Failed to update post.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit Post</h1>
        <p className="text-xs md:text-base text-gray-600">ID: {post.id}</p>
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
            <CardTitle>Edit Post Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to update your post.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7">

            {/* SMALL HEADER EN */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Small Header (EN)
              </label>
              <input
                type="text"
                name="small_header"
                value={form.small_header}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

            {/* SMALL HEADER AR */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Small Header (AR)
              </label>
              <input
                type="text"
                name="small_header_ar"
                value={form.small_header_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

            {/* NAME EN */}
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

            {/* NAME AR */}
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

            {/* DESCRIPTION EN */}
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

            {/* DESCRIPTION AR */}
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

            {/* BUTTON NAME EN */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Button Name (EN)
              </label>
              <input
                type="text"
                name="button_name"
                value={form.button_name}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

            {/* BUTTON NAME AR */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Button Name (AR)
              </label>
              <input
                type="text"
                name="button_name_ar"
                value={form.button_name_ar}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

            {/* BUTTON LINK */}
            <div className="flex flex-col">
              <label className="text-base text-black mb-1">
                <span className="text-red-500 text-sm">*</span> Button Link
              </label>
              <input
                type="text"
                name="button_link"
                value={form.button_link}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded border-black bg-white w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw] h-[5vh] text-black"
                required
              />
            </div>

            {/* IMAGE */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Post Image</label>
              <ImageUploader
                endpoint="post"
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
                  onClick={() => router.replace("/admin/dashboard/posts")}
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
