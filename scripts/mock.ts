import { ethers } from "hardhat";

const escrowFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const goals = [
  "Run a marathon",
  "Complete Alchemy course",
  "Complete ethernaut course",
  "Create portfolio About page",
  "Eat healthy",
  "Get a lambo",
  "Participate in a hackathon",
  "Learn p5.js and generative art",
  "Travel the world",
  "Weekly post on lens",
]

async function createGoal(factory, goal, arbiter, beneficiary, depositor, value) {
  const createEscrowTx = await factory.connect(depositor).createEscrow(goal, arbiter, beneficiary, {
    value,
  });
}
async function main() {
  const signers = await ethers.getSigners();
  const escrowFactory = await ethers.getContractAt("EscrowFactory", escrowFactoryAddress);

  signers.slice(1, 11).map((signer, i) => {
    createGoal(escrowFactory, goals[i], signers[0].address, signers[i+1].address, signers[i], ethers.utils.parseEther("0.1"));
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
