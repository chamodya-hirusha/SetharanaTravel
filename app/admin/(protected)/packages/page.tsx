import { getPackages } from "@/app/admin/actions/packages";
import PackagesClient from "@/components/admin/PackagesClient";

export default async function PackagesPage() {
  const packages = await getPackages();
  return <PackagesClient initialPackages={packages} />;
}
