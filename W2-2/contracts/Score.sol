// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "./interfaces/IScore.sol";
contract Score is IScore{

    mapping(address => uint8) private _score;

    function setScore(address student,uint8 score) external {
        require(score <= 100,"score should <= 100");
        _score[student] = score;
    }


    function updateScore(address student,uint8 score) external {
        require(score <= 100,"score should <= 100");
        _score[student] = score;
    }

    function getScore(address student) external view returns(uint8){
        return _score[student];
    }


}


