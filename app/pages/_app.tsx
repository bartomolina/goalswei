import "../styles/globals.css";
import "../styles/react-datepicker.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import client from "../lib/wagmi";

import { GoalsProvider } from "../components/goals-context";
import { NotificationsProvider } from "../components/notifications-context";
import Layout from "../components/layout";
import Notification from "../components/notification";
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
        <NotificationsProvider>
          <GoalsProvider>
            <Layout>
              <Component {...pageProps} />
              <Notification />
            </Layout>
          </GoalsProvider>
        </NotificationsProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  </>
);

export default App;
