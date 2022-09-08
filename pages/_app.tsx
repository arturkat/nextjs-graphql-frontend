import "../styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import NextNProgress from "nextjs-progressbar";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { store } from "../redux/store";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import MyNavbar from "../components/MyNavbar";
import Cart from "../components/Cart";
import MyFooter from "../components/MyFooter";
import { animations } from "../lib/animations";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

declare const window: any;

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric): void {
  if (window.gtag) {
    window.gtag("event", name, {
      event_category:
        label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
  }
}

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const url = `https://localhost:3000${router.route}`;
  const activeAnimation = animations[0];

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.jpg" type="image/png" />
      </Head>

      <DefaultSeo
        titleTemplate="%s - Art Kat"
        openGraph={{
          type: "website",
          locale: "en_IE",
          url,
          description: "The personal website for Art Kat, developer.",
          site_name: "Art Kat | artkat.dev",
          images: [],
        }}
        canonical={url}
      />

      <ReduxProvider store={store}>
        <ApolloProvider client={apolloClient}>
          <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={4}
            showOnShallow={true}
            options={{ easing: "ease", speed: 500 }}
          />
          <MyNavbar />

          <LazyMotion features={domAnimation}>
            <AnimatePresence
              mode="wait"
              onExitComplete={() => window.scrollTo(0, 0)}
              // initial={false}
            >
              <m.div
                key={router.route.concat(activeAnimation.name)}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={activeAnimation.variants}
                transition={activeAnimation.transition}
              >
                <Component {...pageProps} canonical={url} key={url} />
              </m.div>
            </AnimatePresence>
          </LazyMotion>

          <Cart />
          <MyFooter />
        </ApolloProvider>
      </ReduxProvider>
    </>
  );
}

export default MyApp;
