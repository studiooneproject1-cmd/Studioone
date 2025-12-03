import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Upload images for slider
  slider: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Slider Upload Complete:", file.url);
    return { uploadedUrl: file.url };
  }),

  // Upload images for our clients
  ourClients: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Our Clients Upload Complete:", file.url);
    return { uploadedUrl: file.url };
  }),


    projects: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Our project Upload Complete:", file.url);
    return { uploadedUrl: file.url };
  }),

      post: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Our post Upload Complete:", file.url);
    return { uploadedUrl: file.url };
  }),


  // Upload images for services
  service: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Service Upload Complete:", file.url);
    return { uploadedUrl: file.url };
  }),
} satisfies FileRouter;




export type OurFileRouter = typeof ourFileRouter;
