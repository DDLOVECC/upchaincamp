// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
contract Vault {
    mapping(address => uint) public deposited;
    address public immutable token;
    address owner;
    constructor(address _token) {
         token = _token;
         owner = msg.sender;
    }

    function deposit(address user, uint amount) public {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        deposited[user] += amount;
    }

    function permitDeposit(address user, uint amount, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
        IERC20Permit(token).permit(msg.sender, address(this), amount, deadline, v, r, s);
        deposit(user, amount);
    }

    function withdraw(uint amount) public{
        SafeERC20.safeTransfer(IERC20(token), msg.sender, amount);
        deposited[msg.sender] -= amount;
    }

    function transferToAnotherAddress() public{
        if(IERC20(token).balanceOf(address(this)) > 100 ** 18){
            SafeERC20.safeTransfer(IERC20(token), owner, (100/2) ** 18);
        }
    }
}
