require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-ethers");
require('hardhat-abi-exporter');
require('dotenv').config();

const { API_URL, PRIVATE_KEY ,API_KEY} = process.env
module.exports = {
  solidity: "0.8.18",
  networks: {
    polygon_mumbai: {
      url: API_URL,
      accounts: [`${PRIVATE_KEY}`],
    }
  },
  etherscan: {
    apiKey: API_KEY
  },
  abiExporter: {
    path: './deploys/abi',
    clear: true,
    flat: true,
    only: ['ERC721Token'],
    spacing: 2,
    pretty: true,
  }
};
