<template>
    <div class="greetings">
        <h3>
            <div>
                <button @click="ConnectWallet">链接钱包</button>
            </div>
            <div>
                <button @click="MintNFT">铸造NFT</button>
            </div>
        </h3>
    </div>
</template>
<script>
    import {ethers} from "ethers";
    import ERC721ABI from "../../deploys/abi/ERC721Token.json";
    import ERC721Addr from "../../deploys/dev/ERC721TokenAddr.json";

    export default {
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
                    this.signer = provider.getSigner();
                    this.initContract(this.signer);
                }
            },
            async MintNFT() {
                let tx = await this.ERC721.safeMint(this.address);
            },
            async initContract(signer) {
                this.ERC721 = new ethers.Contract(ERC721Addr.address,
                    ERC721ABI, this.signer);
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
