import { ethers } from "hardhat";

const escrowFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const goals = [
  "Run a half marathon",
  "Complete Alchemy course",
  "Complete ethernaut course",
  "Create portfolio About page",
  "Eat healthy",
  "Get a lambo",
  "Join in a hackathon",
  "Research p5.js and generative art",
  "Travel the world",
  "Weekly post on lens",
];
function randomDate() {
  const nextYear = new Date();
  nextYear.setDate(nextYear.getDate() + 365);
  return new Date(Date.now() + Math.random() * (nextYear.getTime() - Date.now()));
}
const randomWei = (min, max) => Math.floor(Math.random() * (max - min)) + min;

async function createGoal(factory, goal, arbiter, beneficiary, unlockTime, depositor, value) {
  const createEscrowTx = await factory.connect(depositor).createEscrow(goal, arbiter, beneficiary, unlockTime, {
    value,
  });
}
async function main() {
  const signers = await ethers.getSigners();
  const escrowFactory = await ethers.getContractAt("EscrowFactory", escrowFactoryAddress);

  signers.slice(1, 11).map((signer, i) => {
    const unlockTime = Math.floor(randomDate().getTime() / 1000);
    const value = ethers.utils.parseEther(Math.random().toFixed(3));

    createGoal(
      escrowFactory,
      goals[i],
      signers[0].address,
      signers[i + 1].address,
      unlockTime,
      signers[i],
      value,
    );
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
