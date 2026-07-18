import PatientPortalClient from "./PortalClient";

export const metadata = {
  title: "Patient Portal | Trust-Way Hospital",
  description: "Securely log into the Trust-Way Hospital patient portal. Book clinical appointments, check your medical records, folder number, and manage upcoming visits online.",
};

export default function PatientPortalPage() {
  return <PatientPortalClient />;
}
