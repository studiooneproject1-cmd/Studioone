import React from "react";
import Image from "next/image";
import type { categoryWithProject } from "@/types/index";
import ProjectCircle from "./projectCircle";

interface ProjectCardProps {
  project: categoryWithProject;
  className?: string;
}

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
  if (!project.project_image) return null;

  return (
    <div
      className={`relative w-full max-w-[900px] rounded-lg overflow-hidden ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      <Image
        src={project.project_image}
        alt={project.category_name || "project"}
        fill
        className="object-cover"
      />
      <ProjectCircle />
    </div>
  );
}
