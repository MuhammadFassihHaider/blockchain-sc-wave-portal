// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    address public ownerAddress;
    mapping(address => uint256) public waves;

    event Waved(uint256 wavesOfUser, address wavedBy);

    event GotWavesFromUser(uint256 wavesFromUser);

    modifier onlyOwner() {
        require(msg.sender == ownerAddress, "You're not owner!");
        _;
    }

    constructor() {
        ownerAddress = msg.sender;
    }

    /*
     * increments wave from a particular address by 1
     */
    function wave() public {
        waves[msg.sender] += 1;

        emit Waved(waves[msg.sender], msg.sender);
    }
}
