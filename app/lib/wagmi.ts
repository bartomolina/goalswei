import { createClient, configureChains } from "wagmi";
import { mainnet, goerli, hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, hardhat],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API }),
    publicProvider(),
  ],
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export default client;
