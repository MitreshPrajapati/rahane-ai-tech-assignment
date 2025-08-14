// app/dashboard/layout.jsx
"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      roles: ["admin", "editor", "viewer"],
    },
    // {
    //   label: "Manage Content",
    //   href: "/dashboard/users",
    //   roles: ["admin", "editor"],
    // },
    {
      label: "View Content",
      href: "/dashboard/content",
      roles: ["admin", "editor", "viewer"],
    },
    {
      label: "View Users",
      href: "/dashboard/users",
      roles: ["admin"],
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
      router.replace("/login");
    }
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-lg font-bold mb-4">Rahane Ai Tech</h2>
          <nav>
            {menuItems
              .filter((item) =>
                item.roles.some((role) => user?.roles.includes(role))
              )
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 hover:bg-gray-700"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
          <button
            onClick={logout}
            className="mt-4 bg-red-500 w-full py-1 rounded"
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6 h-screen overflow-y-auto">
          <header className="flex justify-between mb-4 border-b pb-2">
            <h1 className="text-xl font-bold">Welcome: {user?.email} </h1>
            {user?.roles && (
              <p>
                <span>Roles: {user?.roles.map((r) => r + ", ")}</span>
              </p>
            )}
          </header>
          {children}
        </div>
      </div>
    </>
  );
}
