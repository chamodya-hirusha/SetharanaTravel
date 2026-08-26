import SecuritySettingsClient from "@/components/admin/SecuritySettings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Settings | Admin Dashboard",
  description: "Manage your admin password and security",
};

export default function SecurityPage() {
  return <SecuritySettingsClient />;
}
