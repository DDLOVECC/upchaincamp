const hre = require("hardhat");

async function main() {
    const ERC2612 = await hre.ethers.getContractFactory("ERC2612");
    const eRC2612 = await ERC2612.deploy();

    await eRC2612.deployed();

    console.log(
        `ERC2612 deployed to ${eRC2612.address}`
    );

    const Vault = await hre.ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(eRC2612.address);

    await vault.deployed();

    console.log(
        `Vault  deployed to ${vault.address}`
    );

    // const MyErc721 = await hre.ethers.getContractFactory("MyErc721");
    // const myErc721 = await MyErc721.deploy();
    //
    // await myErc721.deployed();
    //
    // console.log(
    //     `MyErc721 deployed to ${myErc721.address}`
    // );

    // const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
    // const nFTMarket = await NFTMarket.deploy(myToken.address,myErc721.address);
    //
    // await nFTMarket.deployed();
    //
    // console.log(
    //     `NFTMarket deployed to ${nFTMarket.address}`
    // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
