import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";

export const metadata = {
  title: "mingle — admin",
  description: "Панель управления Mingle",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}
