import "./globals.css";
import "@/src/styles/container.css";
import { ReactNode } from "react";
import SessionProviderWrapper from "@/src/components/SessionProviderWrapper";

export const metadata = {
  title: "Movie Fun Facts",
  description: "Google login + Prisma + OpenAI fun facts"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
