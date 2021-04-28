// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GreenCollectible is ERC721, Ownable {
    using Counters for Counters.Counter;

    uint256 public donationAmount;
    Counters.Counter private tokenIds;

    struct TopTenDonation {
        address donator;
        uint256 totalDonationsByDonator;
    }
    TopTenDonation[10] private topTenDonations;

    mapping(uint256 => string) private _tokenURIs;
    mapping(address => bool) public isAnEligibleNonProfitOrganization;
    //used to keep track of how much eth has been donated by a wallet address
    mapping(address => uint256) public totalDonations;
    mapping(string => bool) public hasBeenMinted;

    event Donated(address from, address to, uint256 amount);
    event Authorized(address recipient);
    event Unauthorized(address recipient);

    constructor() ERC721("NFTreeCollectible", "NFTC") {}

    function createCollectibleAndDonate(
        string memory metadata,
        address payable recipient
    ) public payable returns (uint256) {
        require(
            msg.value >= 0.001 ether,
            "You have to donate at least 0.001 eth to the non-profit organization in order to create the NFT."
        );
        require(
            isAnEligibleNonProfitOrganization[recipient],
            "You are sending eth to a recipient that is not part of the list of eligible recipients."
        );
        require(
            !hasBeenMinted[metadata],
            "This IPFS hash has already been used to mint an NFT!"
        );

        //send to non-profit organization
        (bool sent, ) = recipient.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        totalDonations[msg.sender] = totalDonations[msg.sender] + msg.value;

        hasBeenMinted[metadata] = true;
        tokenIds.increment();
        uint256 newItemId = tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadata);
        checkDonatorForTopTen(msg.sender);

        emit Donated(msg.sender, recipient, msg.value);

        return newItemId;
    }

    function authorizeRecipient(address recipient) external onlyOwner {
        require(
            !isAnEligibleNonProfitOrganization[recipient],
            "Recipient has already been authorized."
        );
        isAnEligibleNonProfitOrganization[recipient] = true;
        emit Authorized(recipient);
    }

    function unauthorizeRecipient(address recipient) external onlyOwner {
        require(
            isAnEligibleNonProfitOrganization[recipient],
            "Recipient has to be authorized."
        );
        isAnEligibleNonProfitOrganization[recipient] = false;
        emit Unauthorized(recipient);
    }

    function checkDonatorForTopTen(address donator) private {
        //get index of the current max element
        uint256 i = 0;
        bool isToBeUpdated = false;
        for (i; i < topTenDonations.length; i++) {
            if (topTenDonations[i].totalDonationsByDonator < totalDonations[donator]) {
                isToBeUpdated = true;
                break;
            }
        }
        if (isToBeUpdated) {
            for (uint256 j = topTenDonations.length - 1; j > i; j--) {
                topTenDonations[j].donator = topTenDonations[j - 1].donator;
                topTenDonations[j].totalDonationsByDonator = topTenDonations[j - 1].totalDonationsByDonator;  
            }
            topTenDonations[i].donator = donator;
            topTenDonations[i].totalDonationsByDonator = totalDonations[donator]; 
        }
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    function getTopTenDonation(uint256 id)
        public
        view
        returns (address donator, uint256 totalDonationsByDonator)
    {
        return (
            topTenDonations[id].donator,
            topTenDonations[id].totalDonationsByDonator
        );
    }
}
