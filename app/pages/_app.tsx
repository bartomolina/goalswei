import "../styles/globals.css";
import "../styles/react-datepicker.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { WagmiConfig, useAccount, useConnect, useContractRead } from "wagmi";
import client from "../lib/wagmi";
import { ConnectKitProvider } from "connectkit";

import BlockieAvatar from "../lib/connect-button-avatar";
import Layout from "../components/layout";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="auto" mode="light" options={{
          customAvatar: BlockieAvatar,
        }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConnectKitProvider>
    </WagmiConfig>
  </>
);

export default App;
