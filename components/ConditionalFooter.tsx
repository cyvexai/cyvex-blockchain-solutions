"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const path = usePathname() || "";
  // don’t show Footer when path starts with /dashboard
  if (path.startsWith("/dashboard")) return null;
  return <Footer />;
}