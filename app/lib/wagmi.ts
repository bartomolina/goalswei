import { createClient, configureChains } from "wagmi";
import { mainnet, goerli, hardhat } from "wagmi/chains";
import { getDefaultClient } from "connectkit";

const client = createClient(
  getDefaultClient({
    appName: "WAGMI",
    alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_API,
    chains: [mainnet, goerli, hardhat],
  })
);

export default client;
