// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract MultiSigWallet{

    struct Transaction {
        address to;
        uint256 amount;
        bytes data;
        bool executed;
        uint256 noOfConfirmations;
    }

    address[] public owners;
    Transaction[] public transactions;
    mapping(address => bool) public isOwner;
    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    uint256 minimumNoOfConfirmation;
    constructor(address[] memory _owners, uint256 _minConfirmCount){
        require(_owners.length > 0, 'owners are required');
        require(_minConfirmCount > 1, 'there must be two owners');
        for(uint256 i=0; i < _owners.length; i++){
            owners.push(_owners[i]);
            isOwner[_owners[i]] = true;
        }

        minimumNoOfConfirmation = _minConfirmCount;
    }

    modifier onlyOwner(){
        require(isOwner[msg.sender],"not owner");
        _;
    }

    modifier isExists(uint256 _tokenIndex){
        require(transactions.length > _tokenIndex, 'Invalid _TokenIndex');
        _;
    }

    function submitTransaction(address _to, uint256 _amount, bytes memory _data) public view returns(uint256) onlyOwner{
        require(_amount > address(this).balance, 'Insufficient Balance');
        Transaction memory txn = Transaction(_to, _amount, _data, false, 0);
        transactions.push(txn);
        return transactions.length;
    }

    function confirmTransaction(uint256 _txnIndex) public onlyOwner{
        if(!isConfirmed[_txnIndex][msg.sender], 'Already confirmed from your side');
        isConfirmed[_txnIndex][msg.sender] = true;
        Transaction storage txn = transactions[_txnIndex];
        txn.noOfConfirmations++;

        require(txn.noOfConfirmations >= minimumNoOfConfirmation, 'Insufficient Confirmations!');
        executeTxn(_txnIndex);
    }

    function revokeConfirmations(uint256 _txnIndex) public onlyOwner(){
        if(isConfirmed[_txnIndex][msg.sender], 'you have not confirmed from your side');
        isConfirmed[_txnIndex][msg.sender] = false;
        Transaction storage txn = transactions[_txnIndex];
        txn.noOfConfirmations--;
    }

    function executeTxn(uint256 _txnIndex) private{
        Transaction storage txn = transactions[_txnIndex];
        (bool sent, bytes data) = payable(txn.to).call{value: txn.amount}(txn.data);
        require(sent, 'transaction has been failed');
        txn.executed = true;
    }

    receive() external payable{
    }
}