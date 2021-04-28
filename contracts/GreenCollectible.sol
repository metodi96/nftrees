// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GreenCollectible is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    // Counter for token ids
    Counters.Counter private tokenIds;

    // Top ten donation
    struct TopTenDonation {
        address donator;
        uint256 totalDonationsByDonator;
    }

    // Array of structs of top ten donators and their donations
    TopTenDonation[10] private topTenDonations;

    // Mapping for the to set a tokenURI to a tokenId
    mapping(uint256 => string) private _tokenURIs;

    // Mapping to check if an address is an authorized non-profit organization
    mapping(address => bool) public isAnEligibleNonProfitOrganization;

    // Mapping to keep track of how much eth has been donated by a wallet address
    mapping(address => uint256) public totalDonations;

    // Mapping to check if the metadata has been minted
    mapping(string => bool) public hasBeenMinted;

    /**
     * @dev Emitted when `from` creates a collectible and donates `to` the `amount`.
     */
    event Donated(address from, address to, uint256 amount);

    /**
     * @dev Emitted when `recipient` has been authorized to receive donations by the owner of this smart contract.
     */
    event Authorized(address recipient);

    /**
     * @dev Emitted when `recipient` has been unauthorized to receive donations by the owner of this smart contract.
     */
    event Unauthorized(address recipient);

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection inheriting from the ERC721 smart contract.
     */
    constructor() ERC721("NFTreeCollectible", "NFTC") {}

    /**
     * @dev create a collectible with a `metadata` for the msg.sender and transfer eth to an authorized `recipient`
     *
     * Requirements:
     *
     * - msg.value must be at least 0.001 eth.
     * - `recipient` must be authorized by this contract's owner
     * - `metadata` should be minted for the first time
     *
     * Emits a {Transfer} event - comes from the ERC-721 smart contract.
     * Emits a {Donated} event.
     */
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

    /**
     * @dev authorizes a recipient which in this case is to be a non-profit organization which plants trees around the world
     *
     * Requirements:
     * - msg.sender has to be the owner of this smart contract
     * - `recipient` must not have been authorized.
     *
     * Emits an {Authorized} event.
     */
    function authorizeRecipient(address recipient) external onlyOwner {
        require(
            !isAnEligibleNonProfitOrganization[recipient],
            "Recipient has already been authorized."
        );
        isAnEligibleNonProfitOrganization[recipient] = true;
        emit Authorized(recipient);
    }

    /**
     * @dev unauthorizes a recipient which in this case is to be a non-profit organization which plants trees around the world
     *
     * Requirements:
     * - msg.sender has to be the owner of this smart contract
     * - `recipient` must have been authorized.
     *
     * Emits an {Unauthorized} event.
     */
    function unauthorizeRecipient(address recipient) external onlyOwner {
        require(
            isAnEligibleNonProfitOrganization[recipient],
            "Recipient has to be authorized."
        );
        isAnEligibleNonProfitOrganization[recipient] = false;
        emit Unauthorized(recipient);
    }

    /**
     * @dev check if a certain `donator` is a top ten donator and if not, adds them to the array
     *
     */
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

    /**
     * @dev retrieves a top ten donation containing the `donator` and their `totalDonationsByDonator`
     */
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

    /**
     * @dev sets a `tokenURI` for an existing `tokenId`
     *
     * Requirements:
     * - `tokenId` must exist
     */
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

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }
}
