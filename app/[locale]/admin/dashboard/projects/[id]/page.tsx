
import { getProjectById } from "@/app/models/db/lib/actions/projects";
import { getCategories } from "@/app/models/db/lib/actions/projects";
import EditProjectForm from "@/components/projects/editProjectForm";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const project = await getProjectById(id);
    const catogories = await getCategories();

  return <EditProjectForm project={project} categories={catogories} />;
}
