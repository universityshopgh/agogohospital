import "./globals.css";
import MainLayout from "@/components/MainLayout";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Agogo Presbyterian Hospital | Quality & Compassionate Care",
  description: "Welcome to the official website of Agogo Presbyterian Hospital. Access general patient guidelines, outpatient/inpatient clinic services, diagnostic laboratory, emergency services, and medical portal.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
