// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Collectible is ERC721, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    uint256 public donationAmount;
    Counters.Counter private tokenIds;
    address public owner;

    mapping(address => bool) isAnEligibleNonProfitOrganization;
    mapping(address => uint256) totalDonations;
    mapping(string => bool) hasBeenMinted;

    event Donated(address recipient, uint256 amount, uint256 total);

    constructor() public ERC721("NFTreeCollectible", "NFTC") {
        owner = msg.sender;
    }

    function createCollectibleAndDonate(
        string memory ipfsHash,
        string memory metadata,
        address payable recipient
    ) public payable returns (uint256) {
        require(
            msg.value >= 0.001 ether,
            "You have to donate at least 0.01 eth to the non-profit organization in order to create the NFT."
        );
        require(
            isAnEligibleNonProfitOrganization[recipient],
            "You are sending eth to a recipient that is not part of the list of eligible recipients."
        );
        require(
            !hasBeenMinted[ipfsHash],
            "This IPFS hash has already been used to mint an NFT!"
        );

        //send to non-profit organization
        (bool sent, bytes memory data) = recipient.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        totalDonations[recipient] = totalDonations[recipient] + msg.value;

        hasBeenMinted[ipfsHash] = true;
        tokenIds.increment();
        uint256 newItemId = tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadata);

        emit Donated(recipient, msg.value, totalDonations[recipient]);

        return newItemId;
    }

    function authorizeRecipient(address recipient) external onlyOwner {
        require(
            !isAnEligibleNonProfitOrganization[recipient],
            "Recipient has already been authorized."
        );
        isAnEligibleNonProfitOrganization[recipient] = true;
    }

    function unauthorizeRecipient(address recipient) external onlyOwner {
        require(
            isAnEligibleNonProfitOrganization[recipient],
            "Recipient has to be authorized."
        );
        isAnEligibleNonProfitOrganization[recipient] = false;
    }
}
