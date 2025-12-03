
import { getClientById } from "@/app/models/db/lib/actions/clients";
import EditClientForm from "@/components/clients/editClientForm";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const client = await getClientById(id);

  return <EditClientForm client={client} />;
}
