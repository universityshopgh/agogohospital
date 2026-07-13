import "./globals.css";
import MainLayout from "@/components/MainLayout";

export const metadata = {
  title: "Agogo Presbyterian Hospital | Quality & Compassionate Care",
  description: "Welcome to the official website of Agogo Presbyterian Hospital. Access general patient guidelines, outpatient/inpatient clinic services, diagnostic laboratory, emergency services, and medical portal.",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
