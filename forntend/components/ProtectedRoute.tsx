"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // comprobar token en localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/auth/login"); // redirigir si no hay token
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return <p className="p-6">Comprobando autenticación...</p>;
  }

  return <>{children}</>;
}

