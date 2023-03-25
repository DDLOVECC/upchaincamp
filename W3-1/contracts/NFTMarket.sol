// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarket is IERC721Receiver {
    mapping(uint => uint) public tokenIdPrice;
address public immutable token;
address public immutable nftToken;

    constructor(address _token, address _nftToken){
        token = _token;
        nftToken = _nftToken;
    }

    function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
    ) external override returns (bytes4) {
    return this.onERC721Received.selector;
    }

    function list(uint tokenId, uint amount) public{
        IERC721(nftToken).safeTransferFrom(msg.sender, address(this), tokenId, "");
        tokenIdPrice[tokenId] = amount;
    }

    function buy(uint tokenId, uint amount) external {
        require(amount >= tokenIdPrice[tokenId], "price not allow");

        require(IERC721(nftToken).ownerOf(tokenId) == address(this), "have sell");

        IERC20(token).transferFrom(msg.sender, address(this), tokenIdPrice[tokenId]);
        IERC721(nftToken).transferFrom(address(this), msg.sender, tokenId);
    }
}
