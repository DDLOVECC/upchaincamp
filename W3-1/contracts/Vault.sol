// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault {
    mapping(address => uint) public deposited;
    address public immutable token;

constructor(address _token) {
    token = _token;
}

function deposit(address user, uint amount) public {
    IERC20(token).transferFrom(msg.sender, address(this), amount);
    deposited[user] += amount;
}

function withdraw(address user, uint amount) public{
    deposited[user] -= amount;
    }
}
