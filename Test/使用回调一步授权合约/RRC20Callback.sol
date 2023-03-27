// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
interface TokenRecipient {
    function tokensReceived(address sender, uint amount) external returns (bool);
}
contract RRC20Callback is ERC20 {
    address public owner;
    using Address for address;
    constructor() ERC20("DuHonePen", "DHP") {
        owner = msg.sender;
        _mint(msg.sender, 100000 * 10 ** decimals());
    }


    function transferWithCallback(address recipient, uint256 amount) external returns (bool) {
        _transfer(msg.sender, recipient, amount);

        if (recipient.isContract()) {
            bool rv = TokenRecipient(recipient).tokensReceived(msg.sender, amount);
            require(rv, "No tokensReceived");
        }

        return true;
    }

}
