const hre = require("hardhat");

async function main() {
    const Score = await hre.ethers.getContractFactory("Score");
    const score = await Score.deploy();

    await score.deployed();

    console.log(
        `Score deployed to ${score.address}`
    );

    const Teacher = await hre.ethers.getContractFactory("Teacher");
    const teacher = await Teacher.deploy();

    await teacher.deployed();

    console.log(
        `Teacher deployed to ${teacher.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
