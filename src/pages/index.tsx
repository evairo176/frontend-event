import { Inter } from "next/font/google";

import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Home from "@/components/views/Home";

export default function HomePage() {
  return (
    <LandingPageLayout title="Home">
      <Home />
    </LandingPageLayout>
  );
}
