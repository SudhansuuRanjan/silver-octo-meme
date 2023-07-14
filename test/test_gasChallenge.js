const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Deploy Gas Challenge Contract", () => {
  let gas_contract;

  beforeEach(async () => {
    const gas_challenge_contract = await ethers.getContractFactory(
      "gasChallenge"
    );
    gas_contract = await gas_challenge_contract.deploy();
  });

  describe("Compute Gas", () => {
    it("Should return lower gas", async () => {
      const tx1 = await gas_contract.notOptimizedFunction();
      const notOptimizedGas = await tx1.wait().then((receipt) => receipt.gasUsed);

      const tx2 = await gas_contract.optimizedFunction();
      const optimizedGas = await tx2.wait().then((receipt) => receipt.gasUsed);

      expect(Number(notOptimizedGas)).to.be.greaterThan(Number(optimizedGas));
    });
  });

  describe("Check Sum Of Array", () => {
    it("Should return 0", async () => {
      // Write test block here to check sum of array equals 0
      await gas_contract.optimizedFunction();
      const sum = await gas_contract.getSumOfArray();
      expect(Number(sum)).to.equal(0);
    });
  });
});
