// Hardhat addresses #1, #2, #3
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
import { ethers } from "hardhat";

const staticGoals = [
  {
    goal: "Buy a house",
    arbiter: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    beneficiary: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    unlockTime: new Date("2022-06-01").getTime(),
    depositor: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    value: ethers.utils.parseEther(Math.random().toFixed(3)),
  },
  {
    goal: "Volunteer",
    arbiter: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    beneficiary: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    unlockTime: new Date("2022-11-01").getTime(),
    depositor: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    value: ethers.utils.parseEther(Math.random().toFixed(3)),
  },
  {
    goal: "Drink more water",
    arbiter: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    beneficiary: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    unlockTime: new Date("2022-12-01").getTime(),
    depositor: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    value: ethers.utils.parseEther(Math.random().toFixed(3)),
  },
  {
    goal: "Stop multitasking",
    arbiter: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    beneficiary: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    unlockTime: new Date("2022-01-10").getTime(),
    depositor: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    value: ethers.utils.parseEther(Math.random().toFixed(3)),
  },
  {
    goal: "Read a book",
    arbiter: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    beneficiary: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    unlockTime: new Date("2023-10-10").getTime(),
    depositor: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    value: ethers.utils.parseEther(Math.random().toFixed(3)),
  },
  {
    goal: "Clear out the clutter",
    arbiter: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    beneficiary: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    unlockTime: new Date("2023-10-01").getTime(),
    depositor: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    value: ethers.utils.parseEther(Math.random().toFixed(3)),
  },
];

export default staticGoals;
