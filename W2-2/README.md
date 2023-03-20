##  ScoreContract
    https://sepolia.etherscan.io/address/0xf24DCcDFafbA6Eb1cc31cDe9425f054c7f14D193#code
## TeacherContract
    https://sepolia.etherscan.io/address/0x2f9AaD881a28A7BE6B0d9D0F06Ffd0750FADfFAb#code

##本地npx hardhat test时 teacher问题
       D:\WebStomWorkPlace\upchaincamp\W2-2>npx hardhat test
       
       
         Score contract
       Score contract: 0x5FbDB2315678afecb367f032d93F642f64180aa3
       Score owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
           √ Addition should work (1580ms)
       
         Teacher contract
       Teacher contract address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
       Teacher contract: Promise { <pending> }
           1) Teacher should work
       
       
         1 passing (2s)
         1 failing
       
         1) Teacher contract
              Teacher should work:
            Error: invalid address or ENS name (argument="name", value=5.465844868464591e+47, code=INVALID_A
       RGUMENT, version=contracts/5.7.0)
             at Logger.makeError (node_modules\@ethersproject\logger\src.ts\index.ts:269:28)
             at Logger.throwError (node_modules\@ethersproject\logger\src.ts\index.ts:281:20)
             at Logger.throwArgumentError (node_modules\@ethersproject\logger\src.ts\index.ts:285:21)
             at D:\WebStomWorkPlace\upchaincamp\W2-2\node_modules\@ethersproject\contracts\src.ts\index.ts:1
       23:16
             at step (node_modules\@ethersproject\contracts\lib\index.js:48:23)
             at Object.next (node_modules\@ethersproject\contracts\lib\index.js:29:53)
             at fulfilled (node_modules\@ethersproject\contracts\lib\index.js:20:58)
             at processTicksAndRejections (node:internal/process/task_queues:95:5)
             at runNextTicks (node:internal/process/task_queues:64:3)
             at listOnTimeout (node:internal/timers:533:9)
     