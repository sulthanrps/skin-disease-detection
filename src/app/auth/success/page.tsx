"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthSuccess() {
  const [token] = useSearchParams();

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token[1]);
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/auth";
    }
  }, [token]);

  return <div className="h-screen justify-center items-center flex">Loading...</div>;
}
