"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { canAccess } from "@/utils/roleAccess";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (!canAccess(user.roles, pathname)) {
      router.replace("/dashboard"); // Redirect to dashboard if no access
    }
  }, [user, pathname]);

  return user ? children : null;
}
