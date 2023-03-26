// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract  ERC20Token {

    uint private counter;

    function add(uint256 i) public {
        counter += 1;
    }

    function get() public view returns(uint) {
        return counter;
    }
}
