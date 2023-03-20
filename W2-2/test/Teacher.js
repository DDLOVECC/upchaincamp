const { expect } = require("chai");

describe("Teacher contract", function () {

    let contract;
    let owner;

    beforeEach(async function () {
        // Create the smart contract object to test from
         [owner] = await ethers.getSigners();
        const TeacherContract = await ethers.getContractFactory("Teacher");
         contract = await TeacherContract.deploy();
        console.log("Teacher contract address:", contract.address);
    });

    it("Teacher should work", async function () {
        // Create the smart contract object to test from
        // Get output from functions
        console.log("Teacher contract:", contract.getScore(0x046Daf2De2958316A64Deae5450a01B4F3464086));
        const setScore = await contract.setScore(0x5FbDB2315678afecb367f032d93F642f64180aa3,0x046Daf2De2958316A64Deae5450a01B4F3464086,90);
        const getScores = await contract.getScore(0x5FbDB2315678afecb367f032d93F642f64180aa3,0x046Daf2De2958316A64Deae5450a01B4F3464086);
          console.log("getScores", getScores)
        const updateScore = await contract.updateScore(0x5FbDB2315678afecb367f032d93F642f64180aa3,0x046Daf2De2958316A64Deae5450a01B4F3464086,80);
        const getScore = await contract.getScore(0x5FbDB2315678afecb367f032d93F642f64180aa3,0x046Daf2De2958316A64Deae5450a01B4F3464086);
        console.log("getScore", getScore)
    });
});