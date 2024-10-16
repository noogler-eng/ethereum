//SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// Ether Wallet - contrat is wallet itself
// - Should accept Ether 
// - Owner will be able to withdraw
contract EthersWallet {

    // address of the owner set at the deployement of the contract
    // ether value contans our eters safely
    address public owner;
    event Withdraw(address caller, uint256 amount);
    event Deposit(address sender, uint256 amount);

    constructor(){
        owner = payable(msg.sender);
    }

    modifier onlyOwner{
        require(owner == msg.sender, 'only owner can call this -- ');
        _;
    }

    function getBalance() public view returns(uint256){
        return address(this).balance;
    }

    function withdraw(uint256 _amount) public onlyOwner{
        require(address(this).balance >= _amount, 'insufficent balance!!');
        (bool sent, ) = payable(owner).call{value: _amount}("");
        require(sent, 'withdraw failed!');

        emit Withdraw(msg.sender, _amount);
    }

    // when someone send the ethers without calling any function
    // metamask to here sending ethers
    receive() external payable{
        emit Deposit(msg.sender, msg.value);
    }

    fallback() external payable{}
}