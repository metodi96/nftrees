// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./NonProfitOrganization.sol";

contract Collectible is ERC721, VRFConsumerBase, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    uint256 public donationAmount;
    Counters.Counter private tokenIds;
    mapping(string => bool) hasBeenMinted;

    constructor() public ERC721("NFTreeCollectible", "NFTC") {}

    function createCollectible(
        string memory ipfsHash,
        string memory metadata,
        address payable recipient
    ) public payable returns (uint256) {
        require(!hasBeenMinted[ipfsHash], "This IPFS hash has already been used to mint an NFT!");
        //send to non-profit organization
        (bool sent, bytes memory data) = recipient.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        
        hasBeenMinted[ipfsHash] = true;
        tokenIds.increment();
        uint256 newItemId = tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadata);
        
        return newItemId;
    }
}
