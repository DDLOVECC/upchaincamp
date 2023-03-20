// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IScore {
    function setScore(address student, uint8 score) external;

    function updateScore(address student, uint8 score) external;

    function getScore(address student) external view returns (uint8);
}
