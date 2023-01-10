import "../styles/globals.css";
import "../styles/react-datepicker.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import client from "../lib/wagmi";
import { ConnectKitProvider } from "connectkit";

import Layout from "../components/layout";
import { GoalsProvider } from "../components/goals-context";
import BlockieAvatar from "../lib/connect-button-avatar";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <WagmiConfig client={client}>
      <ConnectKitProvider
        theme="auto"
        mode="light"
        options={{
          customAvatar: BlockieAvatar,
        }}
      >
        <GoalsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GoalsProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  </>
);

export default App;
