// utils/withAuth.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const AuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.replace("/auth");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
}
