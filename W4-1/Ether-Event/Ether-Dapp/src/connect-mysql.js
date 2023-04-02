const {ethers} = require("ethers");

const ERC721TokenABI = require("../deploys/abi/ERC721Token.json");
const ERC721Addr = require("../deploys/dev/ERC721TokenAddr.json");
const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_chain"
});

async function parseTransferEvent(event) {
    const TransferEvent = new ethers.utils.Interface(["event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"]);
    let decodedData = TransferEvent.parseLog(event);
    const from = decodedData.args.from;
    const to = decodedData.args.to;
    //const value = decodedData.args.value+"";
    console.log("from:" + from);
    console.log("to:" + to);
    insertData(from, to);
}

function insertData(from, to) {
    con.query('INSERT INTO t_chain_text (tx_from, tx_to) VALUES (?,?)', [from, to], function (err, result) {
        if (err) throw err
    });
    con.end();
}

async function main() {

    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/XX");

    let myerc20 = new ethers.Contract(ERC721Addr.address, ERC721TokenABI, provider)

    let filter = myerc20.filters.Transfer()
    filter.fromBlock = 33799528;
    filter.toBlock = 33799534;
    // let events = await myerc20.queryFilter(filter);
    let events = await provider.getLogs(filter);
    console.log(events.length);
    for (let i = 0; i < events.length; i++) {
        console.log(events[i]);
        parseTransferEvent(events[i]);
    }
}

main();