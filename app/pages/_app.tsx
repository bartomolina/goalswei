import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import client from "../lib/wagmi";
import Layout from "../components/layout";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <WagmiConfig client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  </>
);

export default App;
