import React from "react";
import CreateNewProject from "@/components/projects/createNewProject";
import { addProject, getCategories } from "@/app/models/db/lib/actions/projects";

async function Page() {

  const categories = await getCategories()

  return (
    <div className="p-5">
      <CreateNewProject action={addProject} categories={categories} />
    </div>
  );
}

export default Page;
