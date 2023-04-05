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
        `Vault deployed to ${vault.address}`
    );

    const VaultResolver = await hre.ethers.getContractFactory("VaultResolver");
    const vaultResolver = await VaultResolver.deploy(eRC2612.address, vault.address);

    await vaultResolver.deployed();
    console.log(
        `VaultResolver deployed to ${vaultResolver.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
