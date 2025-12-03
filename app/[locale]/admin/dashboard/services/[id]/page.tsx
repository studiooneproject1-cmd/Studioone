
import { getServiceById } from "@/app/models/db/lib/actions/services";
import EditServiceForm from "@/components/services/editServiceForm";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const service = await getServiceById(id);

  return <EditServiceForm service={service} />;
}
