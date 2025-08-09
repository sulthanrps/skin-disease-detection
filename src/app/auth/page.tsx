"use client";
import Image from "next/image";
import React from "react";

export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/api/v1/auth/google";
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl text-center w-full p-4 rounded-xl ">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#0B134A] leading-tight mb-6">Login</h1>
        <p className="mb-4 italic">Masuk untuk akses fitur lebih.</p>
        <button onClick={handleLogin} className="flex mx-auto cursor-pointer items-center gap-2 p-2 bg-[#FF3E99] text-white font-bold py-3 px-3 rounded-lg hover:opacity-90 transition-opacity">
          <div className="aspect-square p-1 rounded-full bg-white">
            <Image src={"/ic_google.webp"} width={30} height={30} alt="google" />
          </div>
          Login with google
        </button>
      </div>
    </section>
  );
}
