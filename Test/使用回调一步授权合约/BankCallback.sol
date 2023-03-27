// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
interface TokenRecipient {
    function tokensReceived(address sender, uint amount) external returns (bool);
}

contract BankCallback is TokenRecipient{
    mapping(address => uint) public deposited;
    address public immutable token;

    constructor(address _token) {
        token = _token;
    }


    // 收款时被回调
    function tokensReceived(address sender, uint amount) external returns (bool) {
        require(msg.sender == token, "invalid");
        deposited[sender] += amount;
        return true;
    }
}