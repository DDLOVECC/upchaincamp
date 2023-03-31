<template>
    <div class="greetings">
        <h3>
            <button @click="ConnectWallet">链接钱包</button>
            <p>用户钱包地址：{{address}}</p>
            <p>银行合约地址：{{contractAddress}}</p>
            <p>总发行量：{{totalSupply}}</p>
            <p>发行符号：{{symbol}}</p>
            <p>小数位：{{decimals}}</p>
            <p>钱包余额：{{balance}}</p>
            <p>银行账户余额：{{vaultBalance}}</p>
            <div>
                <p>第一种：普通Transfer向合约账户转账</p>
                <p>账户地址:<input type="text" v-model="moneyOneAddress"/></p>
                <p>转账金额:<input type="text" v-model="moneyOne"/></p>
                <button @click="SaveTransferMoney">Transfer转账</button>
            </div>

            <div>
                <p>第二种：普通Transfer向合约账户转账</p>
                <p>授权地址:<input type="text" v-model="moneyTwoAddress"/></p>
                <p>授权金额:<input type="text" v-model="moneyTwo"/></p>
                <p>已授权金额:{{approved}}</p>
                <button @click="SaveApproveMoney">Approve授权</button>
                <button @click="TransferFromMoney">TransferFrom转账</button>
            </div>

            <div>
                <p>第三种：线下签名向合约账户转账</p>
                <p><input type="text" v-model="moneyThree"/></p>
                <button @click="SaveSignMoney">离线签名转账</button>
            </div>
            <div>
                <p>取款金额：<input type="text"
                               v-model="outMoney"/></p>
                <button @click="WithdrawMoney">取款</button>
            </div>


        </h3>
    </div>
</template>

<script>
    import {ethers} from "ethers";
    //import {dataSlice,parseUnits, formatUnits} from "ethers";
    import ERC2612ABI from "../../delpoys/abi/ERC2612ABI.json";
    import ERC2612Addr from "../../delpoys/dev/ERC2612Address.json";

    import VaultABI from "../../delpoys/abi/VaultABI.json";
    import VaultAddr from "../../delpoys/dev/VaultAddress.json";

    export default {
        props: {},
        data() {
            return {
                message: 'Hello World!',
                address: '',
                balance: '',
                moneyOneAddress: '',
                moneyOne: '',
                moneyTwoAddress: '',
                moneyTwo: '',
                moneyThree: '',
                outMoney: '',
                totalSupply: '',
                symbol: '',
                decimals: '',
                contractAddress: '',
                vaultBalance: '',
                approved: ''
            }
        },
        methods: {
            async ConnectWallet() {
                let provider;
                if (window.ethereum == null) {
                    console.log("MetaMask not installed; using read-only defaults")
                    provider = ethers.getDefaultProvider();
                } else {
                    provider = new ethers.providers.Web3Provider(window.ethereum);
                    let network = await provider.getNetwork()
                    this.chainId = network.chainId;
                    this.signer = await provider.getSigner();
                    this.accounts = await provider.send("eth_requestAccounts", []);
                    console.log("accounts:" + this.accounts);
                    this.address = this.accounts[0];

                    this.signer = provider.getSigner()
                    this.initContract(this.signer);
                    console.log(this.signer.address);
                }
            },
            async SaveTransferMoney() {
                //直接调用transfer给合约转账
                // let ERC2612 = new ethers.Contract(ERC2612Addr.address,
                //     ERC2612ABI, this.signer);
                let amount = await ethers.utils.parseUnits(this.moneyOne, 18);
                console.log(this.signer);
                console.log(amount);
                let tx = await this.ERC2612.transfer(this.moneyOneAddress, amount);
                console.log(tx);
                this.initContract(this.signer);
            },
            async SaveApproveMoney() {
                //调用 授权和 两步实现向合约转账
                let amount = ethers.utils.parseUnits(this.moneyTwo, 18);
                let tx = await this.ERC2612.approve(this.moneyTwoAddress, amount);
                await tx.wait();
                this.getApproved();
                this.initContract(this.signer);
                console.log("moneyTwo saved:{}", this.moneyTwo);
                console.log("moneyTwoAddress saved:{}", this.moneyTwoAddress);
            },
            async getApproved() {
                let approved = await this.ERC2612.allowance(this.address, this.moneyTwoAddress);
                this.approved = ethers.utils.formatUnits(approved);
            },
            async TransferFromMoney() {
                let amount = ethers.utils.parseUnits(this.moneyTwo, 18);
                let tx = await this.vault.deposit(this.address, amount);
                this.initContract(this.signer);
            },
            async SaveSignMoney() {
                //通过线下签名授权给合约转账
                let nonce = await this.ERC2612.nonces(this.address);
                this.deadline = Math.ceil(Date.now() / 1000) + parseInt(20 * 60);

                let amount = ethers.utils.parseUnits(this.moneyThree).toString();
                console.log("amountTwo saved:{}", amount);
                const domain = {
                    name: 'ERC2612',
                    version: '1',
                    chainId: this.chainId,
                    verifyingContract: ERC2612Addr.address
                }
                const types = {
                    Permit: [
                        {name: "owner", type: "address"},
                        {name: "spender", type: "address"},
                        {name: "value", type: "uint256"},
                        {name: "nonce", type: "uint256"},
                        {name: "deadline", type: "uint256"}
                    ]
                }
                const message = {
                    owner: this.address,
                    spender: VaultAddr.address,
                    value: amount,
                    nonce: nonce,
                    deadline: this.deadline
                }
                const signature = await this.signer._signTypedData(domain, types, message);
                console.log(signature);
                const {v, r, s} = ethers.utils.splitSignature(signature);;
                let tx = await this.vault.permitDeposit(this.address, amount, this.deadline, v, r, s);
                let receipt = await tx.wait();
                this.initContract(this.signer);
                console.log("moneyThree saved:{}", this.moneyThree);
            },
            WithdrawMoney() {
                //调用合约取款
                console.log("outMoney outMoney:{}", this.outMoney);
            },
            getBalance(address) {
                //调用合约查询余额
                // this.balance =
            },
            async initContract(signer) {
                this.ERC2612 = new ethers.Contract(ERC2612Addr.address,
                    ERC2612ABI, signer);
                this.decimals = await this.ERC2612.decimals();
                let total = await this.ERC2612.totalSupply();
                this.totalSupply = ethers.utils.formatUnits(total);
                this.symbol = await this.ERC2612.symbol();
                let balance = await this.ERC2612.balanceOf(this.address);
                this.balance = ethers.utils.formatUnits(balance, this.decimals);

                this.vault = new ethers.Contract(VaultAddr.address,
                    VaultABI, signer);
                this.contractAddress = VaultAddr.address;
                let vaultBalance = await this.vault.deposited(this.address);
                this.vaultBalance = ethers.utils.formatUnits(vaultBalance, this.decimals);
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-weight: 500;
        font-size: 2.6rem;
        top: -10px;
    }

    h3 {
        font-size: 1.2rem;
        align-items: center;
    }

    .greetings h1,
    .greetings h3 {
        text-align: center;
    }

    @media (min-width: 1024px) {
        .greetings h1,
        .greetings h3 {
            text-align: left;
        }
    }
</style>
