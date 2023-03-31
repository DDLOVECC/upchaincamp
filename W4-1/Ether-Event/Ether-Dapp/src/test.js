// import {ethers} from "ethers";
// import ERC721TokenABI from "../deploys/abi/ERC721Token.json";
// import ERC721Addr from "../deploy/dev/ERC20Addr.json";
const { ethers } = require("ethers");
const ERC721TokenABI = require("../deploys/abi/ERC721Token.json") ;
const ERC721Addr = require("../deploys/dev/ERC721TokenAddr.json");
async function parseTransferEvent(event) {
    const TransferEvent = new ethers.utils.Interface(["event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"]);
    let decodedData = TransferEvent.parseLog(event);
    console.log("from:" + decodedData.args.from);
    console.log("to:" + decodedData.args.to);
    console.log("value:" + decodedData.args.value.toString());
}

async function main() {
    let provider = new ethers.providers.WebSocketProvider("wss://polygon-mumbai.g.alchemy.com/v2/XX");
    let myRec721Token = new ethers.Contract(ERC721Addr.address, ERC721TokenABI, provider)

    let filter = myRec721Token.filters.Transfer();
    provider.on(filter, (event) => {
        console.log(event)
        parseTransferEvent(event);
    })
}

main();
