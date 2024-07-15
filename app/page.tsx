"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";


// export const metadata: Metadata = {
//   title: "ShellForge",
//   description: "Where coding meets convenience, online.",
// };


export default function Home() {
  const router = useRouter();
  useEffect(() =>{
    router.push("/dashboard");
  }, []);
  return (
    <div>
      Redirecting ...
    </div>
  );
}
