import { getTestimonials } from "@/app/admin/actions/testimonials";
import TestimonialsClient from "@/components/admin/TestimonialsClient";

export default async function TestimonialsPage() {
  const items = await getTestimonials();
  return <TestimonialsClient initialItems={items} />;
}
