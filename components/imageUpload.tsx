"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadCloudIcon, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  endpoint: keyof OurFileRouter;
  onUploadComplete: (url: string) => void;
  onUploadError: (error: Error) => void;
  initialImageUrl?: string | null;
  onDelete?: () => void;
}

export default function ImageUploader({
  endpoint,
  onUploadComplete,
  onUploadError,
  initialImageUrl,
  onDelete,
}: ImageUploaderProps) {
  // ✅ تهيئة state مباشرة لتجنب تحذير setState في useEffect
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = () => {
    setImageUrl(null);
    setErrorMessage(null);
    if (onDelete) onDelete();
  };

  // إذا فيه صورة موجودة، اعرضها مع زر الحذف
  if (imageUrl) {
    return (
      <div className="relative w-full max-w-sm h-48">
        <Image
          src={imageUrl}
          alt="Uploaded Image"
          fill
          className="rounded-lg object-cover"
        />
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"
          aria-label="Delete image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Dropzone لتحميل الصورة
  return (
    <div className="flex flex-col gap-2">
      <UploadDropzone<OurFileRouter, keyof OurFileRouter>
        endpoint={endpoint}
        onUploadBegin={() => {
          setIsUploading(true);
          setErrorMessage(null);
        }}
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          if (res && res[0]) {
            const uploadedUrl = res[0].url;
            setImageUrl(uploadedUrl);
            onUploadComplete(uploadedUrl);
          }
        }}
        onUploadError={() => {
          setIsUploading(false);
          const error = new Error(
            "Upload failed. Please try again or use a smaller image (max 2 MB)."
          );
          setErrorMessage(error.message);
          onUploadError(error);
        }}
        appearance={{
          container:
            "flex flex-col items-center justify-center h-48 w-full max-w-sm text-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
          button:
            "bg-blue-600 text-white rounded-md px-4 py-4 mt-4 hover:bgbg-blue-500",
          label: "text-gray-500 dark:text-gray-400",
        }}
        content={{
          label: ({ isDragActive }) => (
            <div className="flex flex-col items-center justify-center">
              <UploadCloudIcon className="w-12 h-12 text-gray-400 mb-2" />
              <div className="text-sm font-semibold">
                {isUploading
                  ? "Uploading..."
                  : isDragActive
                  ? "Drop the file here"
                  : "Drop file here or click to browse"}
              </div>
              <div className="text-xs text-gray-400 mt-1">Image (Max 2MB)</div>
            </div>
          ),
          allowedContent: null,
        }}
      />

      {errorMessage && (
        <p className="text-red-600 text-sm font-medium mt-2 text-center">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
