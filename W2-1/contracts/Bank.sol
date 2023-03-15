// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Bank {
    mapping(address => uint256) private _balances;
    constructor() payable{
    }
    //转入
    function transferIn(uint8 amount) public{
        _balances[msg.sender] += amount;
    }
    //转出输入金额
    function withdraw(uint8 amount) public{
        _balances[msg.sender] -= amount;
    }
    //转出全部金额
    function withdraw() public{
        _balances[msg.sender] -= _balances[msg.sender] ;
    }
    //获取余额
    function get(address key) public view returns(uint) {
        return _balances[key];
    }
}
