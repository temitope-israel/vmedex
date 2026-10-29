import {redirect} from "next/navigation";
import { getSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";

export default async function PanelLayout({children}: {children: React.ReactNode}) {
    const session= await getSession();
    if(!session) redirect("/admin/login");

return (
  <AdminShell email={session.email} role={session.role}>
    {children}
  </AdminShell>
);}