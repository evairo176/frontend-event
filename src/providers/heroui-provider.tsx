// app/providers.tsx
"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";

export function HeroUiProvider({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" maxVisibleToasts={1} />
      {children}
    </HeroUIProvider>
  );
}
