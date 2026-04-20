import { LangProvider } from "@/context/LangContext";
import "./globals.css";

export const metadata = {
  title: "HernandezTruck — Asistencia Mecánica 24/7",
  description:
    "Mecánicos certificados para camiones y rastras. Asistencia en carretera y servicio a domicilio disponible 24 horas, 365 días.",
  keywords: "mecánico camiones, asistencia carretera, mecánico domicilio, rastras, 24 horas",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "MecaTruck — Asistencia Mecánica 24/7",
    description: "Mecánicos certificados para camiones y rastras. Siempre disponibles.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
