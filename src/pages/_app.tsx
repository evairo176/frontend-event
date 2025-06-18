import { HeroUiProvider } from "@/providers/heroui-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUiProvider>
      <Component {...pageProps} />
    </HeroUiProvider>
  );
}
