import { ethers } from "hardhat";
import staticGoals from "./static-goals";

const escrowFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const goals = [
  "Run a half marathon",
  "Complete Alchemy course",
  "Complete ethernaut course",
  "Create portfolio About page",
  "Eat healthy",
  "Get a lambo",
  "Join a hackathon",
  "Research p5.js and generative art",
  "Travel the world",
  "Weekly post on lens",
  // "Take the stairs",
  // "Start a new hobby",
];

function randomDate() {
  const nextYear = new Date();
  const sixMoAgo = new Date();
  nextYear.setDate(nextYear.getDate() + 365);
  sixMoAgo.setDate(nextYear.getDate() - 182);
  return new Date(Math.random() * (nextYear.getTime() - sixMoAgo.getTime() + 1) + sixMoAgo.getTime());
}

async function createGoal(factory, goal, arbiter, beneficiary, unlockTime, depositor, value) {
  const createEscrowTx = await factory.connect(depositor).createEscrow(goal, arbiter, beneficiary, unlockTime, {
    value,
  });
}

async function createStaticGoals(factory, signers) {
  for (const goal of staticGoals) {
    const depositor = signers.find((signer) => signer.address === goal.depositor);
    await createGoal(factory, goal.goal, goal.arbiter, goal.beneficiary, goal.unlockTime / 1000, depositor, goal.value);
  }
}

async function main() {
  const signers = await ethers.getSigners();
  const escrowFactory = await ethers.getContractAt("EscrowFactory", escrowFactoryAddress);

  signers.slice(1, 11).map((signer, i) => {
    const unlockTime = Math.floor(randomDate().getTime() / 1000);
    const value = ethers.utils.parseEther(Math.random().toFixed(3));
    const arbiter = signers[Math.floor(Math.random() * 3)].address;    

    createGoal(
      escrowFactory,
      goals[i],
      arbiter,
      signers[i + 1].address,
      unlockTime,
      signers[i],
      value,
    );
  });

  createStaticGoals(escrowFactory, signers);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
