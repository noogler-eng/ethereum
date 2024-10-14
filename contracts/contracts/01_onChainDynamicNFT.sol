// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Importing OpenZeppelin libraries
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract MY_NFT is ERC721URIStorage {

    struct Player {
        string name;
        uint256 level;
        uint256 runs;
        uint256 wickets;
    }
    
    uint256 public tokenId;
    mapping(uint256 => Player) public fromTokenToPlayer;

    // Contract constructor setting the token name and symbol
    constructor() ERC721('MY_NFT', 'MY_NFT') {
        tokenId = 0;
    }

    // Generate SVG character based on the player's details
    function generateCharacter(uint256 _playerToken) public view returns (string memory) {
        bytes memory svg = abi.encodePacked(
            "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'>",
            "<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>",
            "<rect width='100%' height='100%' fill='blue' />",
            "<text x='50%' y='30%' class='base' dominant-baseline='middle' text-anchor='middle'>",
            "Name: ", getPlayer(_playerToken), "</text>",
            "<text x='50%' y='40%' class='base' dominant-baseline='middle' text-anchor='middle'>",
            "Level: ", Strings.toString(getLevel(_playerToken)), "</text>",
            "<text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>",
            "Runs: ", Strings.toString(getRuns(_playerToken)), "</text>",
            "<text x='50%' y='60%' class='base' dominant-baseline='middle' text-anchor='middle'>",
            "Wickets: ", Strings.toString(getWickets(_playerToken)), "</text>",
            "</svg>"
        );

        return string(abi.encodePacked("data:image/svg+xml;base64,", Base64.encode(svg)));
    }

    function getPlayer(uint256 _playerToken) public view returns (string memory) {
        return fromTokenToPlayer[_playerToken].name;
    }

    function getLevel(uint256 _playerToken) public view returns (uint256) {
        return fromTokenToPlayer[_playerToken].level;
    }

    function getRuns(uint256 _playerToken) public view returns (uint256) {
        return fromTokenToPlayer[_playerToken].runs;
    }

    function getWickets(uint256 _playerToken) public view returns (uint256) {
        return fromTokenToPlayer[_playerToken].wickets;
    }

    // Generate token URI containing metadata and SVG image
    function getTokenURI(uint256 _playerToken) public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            '{',
            '"name": "Cric NFT #', Strings.toString(_playerToken), '",',
            '"description": "Cricket Players on Chain",',
            '"image": "', generateCharacter(_playerToken), '"',
            '}'
        );
        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(dataURI)));
    }

    // Mint a new NFT, initializing player stats and setting token URI
    function mint(string memory _name) public {
        tokenId++;
        uint256 newItemId = tokenId;
        _safeMint(msg.sender, newItemId);
        fromTokenToPlayer[newItemId] = Player(_name, 0, 0, 0);
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    // Train the player to increase stats and update the token URI
    function train(uint256 _playerToken) public {
        require(_playerToken <= tokenId, "Invalid token ID");
        require(ownerOf(_playerToken) == msg.sender, "You are not the owner");

        // Update player stats
        fromTokenToPlayer[_playerToken].level += 1;
        fromTokenToPlayer[_playerToken].runs += 20;
        fromTokenToPlayer[_playerToken].wickets += 2;

        // Update the token URI with new stats
        _setTokenURI(_playerToken, getTokenURI(_playerToken));
    }
}
