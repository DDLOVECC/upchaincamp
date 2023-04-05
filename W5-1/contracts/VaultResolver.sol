// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
interface IVault {
    function transferToAnotherAddress() external;
}
contract VaultResolver {
    address public immutable token;
    address public immutable vault;
    constructor(address _token,address _vault) {
        token = _token;
        vault = _vault;
    }

    function checker() external {
             if(IERC20(token).balanceOf(vault) > 100 ** 18){
                    IVault(vault).transferToAnotherAddress();
                }
        }
}
