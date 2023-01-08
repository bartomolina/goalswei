import { createClient, configureChains } from "wagmi";
import { mainnet, goerli, hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, hardhat],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'testtest',
  chains
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { client, chains };
