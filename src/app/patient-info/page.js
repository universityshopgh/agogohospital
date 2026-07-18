import PatientInfoClient from "./PatientInfoClient";

export const metadata = {
  title: "Patient Information & Guidelines | Trust-Way Hospital",
  description: "Visitor hours, preparation guidelines, what to bring for clinical admission, patient rights & responsibilities, downloadable medical forms, and FAQs at Trust-Way Hospital.",
};

export default function PatientInfoPage() {
  return <PatientInfoClient />;
}
