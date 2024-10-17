// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Piggy Bank
// -  User can deposit in the wallet 
// - Owner can Withdraw the amount
// - The Contract should be destroyed after withdrawal

contract PiggyBank{

    address public s_owner;
    constructor(){
        s_owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == s_owner, 'Not Owner');
        _;
    }

    // withdrawing whole money 
    function withdraw() public onlyOwner{
        (bool sent,) = payable(s_owner).call{value: address(this).balance}("");
        require(sent, 'withdrawl failed!');
        selfdestruct(payable(s_owner));
        // selfdestruct can be used to destory the contract 
        // and send all the eth to the address mentioned  ,it deleted the ABI associated with it , therefore no function call work 
        // there can be an attack too using selfdestruct where user can force send ether from attack contract
        // to the target contract , destructing this attack contract , more on that in upcoming thread
    }

    receive() external payable{}
    fallback() external payable{}
}