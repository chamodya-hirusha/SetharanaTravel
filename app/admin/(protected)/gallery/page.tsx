import { getGallery } from "@/app/admin/actions/gallery";
import GalleryClient from "@/components/admin/GalleryClient";

export default async function GalleryPage() {
  const items = await getGallery();
  return <GalleryClient initialItems={items} />;
}
