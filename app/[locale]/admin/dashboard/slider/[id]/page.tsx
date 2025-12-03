
import { getSliderById } from "@/app/models/db/lib/actions/sliders";
import EditSliderForm from "@/components/slider/editSlidersForm";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const slider = await getSliderById(id);

  return <EditSliderForm slider={slider} />;
}
