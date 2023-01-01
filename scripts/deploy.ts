import { ethers, artifacts } from "hardhat";
const fs = require("fs");

async function main() {
  const EscrowFactory = await ethers.getContractFactory("EscrowFactory");
  const escrowFactory = await EscrowFactory.deploy();

  await escrowFactory.deployed();

  console.log(`EscrowFactory deployed to ${escrowFactory.address}`);

  const data = {
    address: escrowFactory.address,
    abi: escrowFactory.interface.format("json"),
  };

  fs.writeFileSync("./app/lib/contract.json", JSON.stringify(data));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
