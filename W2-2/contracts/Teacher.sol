// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./interfaces/IScore.sol";

contract Teacher {

    address owner;
    constructor(){
        owner = msg.sender;
    }

    function setScore(address _counter, address student, uint8 score) external onlyTeacher {
        IScore(_counter).setScore(student, score);
    }

    function updateScore(address _counter, address student, uint8 score) external onlyTeacher {
        IScore(_counter).updateScore(student, score);
    }

    function getScore(address _counter, address student) public view returns (uint8){
        IScore(_counter).getScore(student);
    }

    modifier onlyTeacher{
        require(msg.sender == owner, "Only teacher is allowed");
        _;
    }
}
