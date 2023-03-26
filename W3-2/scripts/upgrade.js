
const {ethers,upgrades} = require("hardhat");
const proxyAddress = "0xdb7408460e173604BBeB8A6fcDa02637e047d3d7";
async function main() {

  const ERC20TokenV1 = await ethers.getContractFactory("ERC20TokenV1");
  const proxy = await upgrades.upgradeProxy(proxyAddress,ERC20TokenV1);

  //await proxy.deployed();

  // console.log(
  //   `Lock deployed to ${proxy.address}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
