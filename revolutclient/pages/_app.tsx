import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import '@mantine/charts/styles.css';
import "@fontsource/roboto"
import "../style.css"
export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Head>
        <title>Revault</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
