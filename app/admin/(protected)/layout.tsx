import { isAuthenticated } from "@/app/admin/actions/auth";
import { redirect } from "next/navigation";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export const metadata = {
  title: "Admin Panel | Setharana Travels",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutWrapper>
      {children}
    </AdminLayoutWrapper>
  );
}
