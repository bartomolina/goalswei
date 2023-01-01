import { ethers, artifacts } from "hardhat";
const fs = require("fs");

async function main() {
  const EscrowFactory = await ethers.getContractFactory("EscrowFactory");
  const escrowFactory = await EscrowFactory.deploy();

  await escrowFactory.deployed();

  console.log(`EscrowFactory deployed to ${escrowFactory.address}`);
  let abi = escrowFactory.interface.format("json");
  if (typeof abi != "string") {
    abi = abi[0];
  }

  const data = {
    address: escrowFactory.address,
    abi,
  };

  fs.writeFileSync("./app/lib/contract.json", JSON.stringify(data));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
