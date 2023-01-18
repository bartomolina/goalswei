import { ethers, artifacts } from "hardhat";
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const EscrowFactory = await ethers.getContractFactory("EscrowFactory");
  const Escrow = await ethers.getContractFactory("Escrow");

  const escrowFactory = await EscrowFactory.deploy();
  await escrowFactory.deployed();

  console.log(`EscrowFactory deployed to ${escrowFactory.address}`);

  const EscrowFactoryData = {
    address: escrowFactory.address,
    abi: escrowFactory.interface.format("json"),
  };

  const EscrowData = {
    abi: Escrow.interface.format("json"),
  };

  const networkName = hre.network.name;

  fs.writeFileSync(`./app/lib/${networkName}-escrow-factory-contract.json`, JSON.stringify(EscrowFactoryData));
  fs.writeFileSync("./app/lib/escrow-contract.json", JSON.stringify(EscrowData));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
