// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyErc721 is ERC721 {
    using Counters for Counters.Counter;
    Counters.counter private _tokenIds;
    constructor() ERC721("DuHonePen", "DHP") {
    }

    function mint(address account, String memory tokenURI) public returns (uint256){
        uint256 newTokenId = _tokenIds.current();
        _mint(account, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _tokenIds.increment();
        return newTokenId;
    }
}
