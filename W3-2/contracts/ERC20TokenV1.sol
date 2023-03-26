// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ERC20TokenV1 {
    uint private counter;
    function add(uint256 i) public {
        counter += i;
    }

    function transferWithCallback(address recipient, uint256 amount) external returns (bool){
        return true;
    }
}
