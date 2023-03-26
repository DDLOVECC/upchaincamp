
const { ethers ,upgrades} = require("hardhat");

async function main() {

  const ERC20Token = await ethers.getContractFactory("ERC20Token");
  const proxy = await upgrades.deployProxy(ERC20Token);

  await proxy.deployed();

  console.log(
    `Lock deployed to ${proxy.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
