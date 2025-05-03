import React from "react";

export const metadata = {
  title: "client",
  description: "E-commerce Admin Panel",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: "1rem" }}>{children}</main>
      </body>
    </html>
  );
}
