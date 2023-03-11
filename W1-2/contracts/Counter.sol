// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Counter is ERC20{
    uint public counts;
    address  owner;

    constructor() ERC20("Test","TT"){
        owner = msg.sender;
    }

    function get()  public view returns (uint) {
        return counts;
    }

    modifier onlyOwner {
        require(msg.sender == owner,"only owner call");
        _;
    }

    function count() public onlyOwner{
        counts += 1;
    }

    function dec() public {
        counts -= 1;
    }

    function add(uint x) public {
        counts += x;
    }
}
