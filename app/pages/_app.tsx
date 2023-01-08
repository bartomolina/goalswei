import "../styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import "../styles/react-datepicker.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { client, chains } from "../lib/wagmi";
import Layout from "../components/layout";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  </>
);

export default App;
