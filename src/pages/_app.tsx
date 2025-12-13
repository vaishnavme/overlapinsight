import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { app_themes } from "@/lib/constants";
import AppLayout from "@/components/layout/app-layout";
import fonts from "@/styles/fonts";
import "@/styles/globals.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);

  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme={app_themes.system}
    >
      <div
        className={`${fonts.geistSans.variable} ${fonts.geistMono.variable} ${fonts.sourceSerif4.variable} font-sans isolate antialiased`}
      >
        {getLayout(<Component {...pageProps} />)}
      </div>
    </ThemeProvider>
  );
}
