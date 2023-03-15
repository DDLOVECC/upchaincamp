const { expect } = require("chai");
describe("Bank contract", function () {
  it("Deployment Bank", async function () {
    const [owner] = await ethers.getSigners();

    const Bank = await ethers.getContractFactory("Bank");

    const hardhatToken = await Bank.deploy();
    console.log("contract:{}",hardhatToken)
    // const ownerBalance = await hardhatToken.balanceOf(owner.address);
    // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});