const hre = require("hardhat");

async function main() {

  const ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
  const eRC721Token = await ERC721Token.deploy();

  await eRC721Token.deployed();
  console.log(
    `ERC721Token  deployed to ${eRC721Token.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
