import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Escrow", function () {
  async function deployEscrowFixture() {
    const [owner, beneficiary, arbiter] = await ethers.getSigners();
    const deposit = ethers.utils.parseEther("1");

    // Deploy proxy contract and create a new Escrow contract instance
    const EscrowFactory = await ethers.getContractFactory("EscrowFactory");
    const escrowFactory = await EscrowFactory.deploy();
    const createEscrowTx = await escrowFactory.createEscrow(arbiter.getAddress(), beneficiary.getAddress(), {
      value: deposit,
    });
    const txReceipt = await createEscrowTx.wait();
    const instanceAddress = await txReceipt.events[1].args._instance;

    // Return the new Escrow instance
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = Escrow.attach(instanceAddress);

    return { owner, beneficiary, arbiter, escrow, deposit };
  }

  describe("Deployment", function () {
    it("Should be funded initially", async function () {
      const { escrow, deposit } = await loadFixture(deployEscrowFixture);

      expect(await ethers.provider.getBalance(escrow.address)).to.eq(deposit);
    });
  });

  describe("After approval from address other than the arbiter", function () {
    it("Should revert", async function () {
      const { escrow, beneficiary } = await loadFixture(deployEscrowFixture);

      await expect(escrow.connect(beneficiary).approve()).to.be.reverted;
    });
  });

  describe("After approval from the arbiter", function () {
    it("Should transfer balance to beneficiary", async function () {
      const { escrow, arbiter, beneficiary, deposit } = await loadFixture(deployEscrowFixture);

      const before = await ethers.provider.getBalance(beneficiary.getAddress());
      const approveTxn = await escrow.connect(arbiter).approve();
      approveTxn.wait();
      const after = await ethers.provider.getBalance(beneficiary.getAddress());
      expect(after.sub(before)).to.eq(deposit);
    });
  });
});
