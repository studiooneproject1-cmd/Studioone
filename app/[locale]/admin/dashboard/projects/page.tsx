import { projectsColumns } from "@/components/columns/projects_columns";
import { DataTable } from "@/components/data-table";
import { deleteProject } from "@/app/models/db/lib/actions/projects";
import { getAllProjects } from "@/app/models/db/lib/services/projects";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import type {ProjectData} from "@/types/index"

export default async function ProjectsTable() {

const allProjectsRaw = (await getAllProjects()) || [];


const projectsOnly = allProjectsRaw.filter(p => p.project_id !== null);

const allProjects: ProjectData[] = projectsOnly.map(p => ({
  id: p.project_id?.toString(),
  title: p.project_title ?? "",
  title_ar: p.project_title_ar ?? "",
  description: p.project_description ?? "",
  description_ar: p.project_description_ar ?? "",
  image: p.project_image ?? "",
  category_id: p.category_id?.toString(),
  category_name: p.category_name ?? "",
  is_recent: p.project_is_recent ?? false,
}));


  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[75vw] text-black">
      
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Projects</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of all projects.
        </h2>
      </div>

    
      {allProjects.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Projects Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You haven’t added any projects yet.
            </p>
            <NavigationButton
              routeName="newProject"
              value="Add New Project"
            />
          </CardContent>
        </Card>
      ) : (
        <>
  
          <DataTable
            columns={projectsColumns}
            data={allProjects}
            routeName="projects"
            deleteAction={deleteProject}
          />

         
          <div className="mt-5">
            <NavigationButton
              routeName="newProject"
              value="Add New Project"
            />
          </div>
        </>
      )}
    </main>
  );
}
