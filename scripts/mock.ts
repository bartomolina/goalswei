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
  "Take the stairs",
];

function randomDate() {
  const nextYear = new Date();
  const sixMoAgo = new Date();
  nextYear.setDate(nextYear.getDate() + 365);
  sixMoAgo.setDate(nextYear.getDate() - 182);
  return new Date(Math.random() * (nextYear.getTime() - sixMoAgo.getTime() + 1) + sixMoAgo.getTime());
}

async function createStaticGoals(factory, signers) {
  for (const goal of staticGoals) {
    const depositor = signers.find((signer) => signer.address === goal.depositor);
    await createGoal(factory, goal.goal, goal.arbiter, goal.beneficiary, goal.unlockTime / 1000, depositor, goal.value);
  }
}

async function createGoal(factory, goal, arbiter, beneficiary, unlockTime, depositor, value) {
  const createEscrowTx = await factory.connect(depositor).createEscrow(goal, arbiter, beneficiary, unlockTime, {
    value,
  });
  const receipt = await createEscrowTx.wait();
  console.log(receipt.events[1].args._instance);
}

async function addBeneficiary(factory, signer) {
  const addBeneficiaryTx = await factory.connect(signer).addBeneficiary("https://github.com/");
  const receipt = await addBeneficiaryTx.wait();
}

async function main() {
  const signers = await ethers.getSigners();
  const escrowFactory = await ethers.getContractAt("EscrowFactory", escrowFactoryAddress);

  const testNumber = 10;

  for (let i = 0; i <= testNumber; i++) {
    await addBeneficiary(escrowFactory, signers[i]);
  }

  for (let i = 0; i < testNumber; i++) {
    const unlockTime = Math.floor(randomDate().getTime() / 1000);
    const value = ethers.utils.parseEther(Math.random().toFixed(3));
    const arbiter = signers[Math.floor(Math.random() * 3)].address;

    await createGoal(escrowFactory, goals[i], arbiter, signers[i + 1].address, unlockTime, signers[i], value);
  }

  await createStaticGoals(escrowFactory, signers);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
