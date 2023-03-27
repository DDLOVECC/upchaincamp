// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract Bank{
    mapping(address => uint) public balances;

    address public immutable token;
    //接收token合约地址
    constructor(address _token){
        token = _token;
    }

    function deposite(address user,uint amount) public{
        IERC20(token).transferFrom(msg.sender,address(this),amount);
        balances[user] += amount;
    }


}