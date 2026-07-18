import AdminConsoleClient from "./AdminClient";

export const metadata = {
  title: "Admin Console | Trust-Way Hospital",
  description: "Internal administration dashboard for Trust-Way Hospital. Manage submitted user enquiries, view appointments, and update live blood bank stocks.",
};

export default function AdminPage() {
  return <AdminConsoleClient />;
}
