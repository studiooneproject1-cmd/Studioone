
import { getPostById } from "@/app/models/db/lib/actions/posts";
import EditPostForm from "@/components/posts/editPostForm";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  return <EditPostForm post={post} />;
}
