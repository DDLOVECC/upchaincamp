// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erc20Token is ERC20 {
    address public owner;
    constructor() ERC20("DuHonePen", "DHP") {
        owner = msg.sender;
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}
