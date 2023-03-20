const {expect} = require("chai");

describe("Score contract", function () {
    it("Addition should work", async function () {
        // Create the smart contract object to test from
        const [owner] = await ethers.getSigners();
        const ScoreContract = await ethers.getContractFactory("Score");
        const contract = await ScoreContract.deploy();

        // Get output from functions
        console.log("Score contract:", contract.address);
        console.log("Score owner:", owner.address);
    });
});