// app/admin/layout.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard",
  description: "E-commerce Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem", background: "#111", color: "#fff" }}>
          <h1>Admin Panel</h1>
          <nav>
            <Link href="/admin/dashboard">Dashboard</Link> |{" "}
            <Link href="/admin/products">Products</Link> |{" "}
            <Link href="/admin/orders">Orders</Link> |{" "}
            <Link href="/admin/users">Users</Link>
          </nav>
        </header>
        <main style={{ padding: "1rem" }}>{children}</main>
      </body>
    </html>
  );
}
