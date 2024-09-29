"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function V3Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => router.push("/"), []);

  return <div className="overflow-x-hidden">{children}</div>;
}
