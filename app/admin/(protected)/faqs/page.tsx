import { getFaqs } from "@/app/admin/actions/faqs";
import FaqsClient from "@/components/admin/FaqsClient";

export default async function FaqsPage() {
  const faqs = await getFaqs();
  return <FaqsClient initialFaqs={faqs} />;
}
