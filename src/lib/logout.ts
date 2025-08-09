"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("access_token");
    router.push("/auth");
  };

  return logout;
}
