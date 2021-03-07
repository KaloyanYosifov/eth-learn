// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "./Token.sol";

contract Bank {
    Token private token;

    mapping(address => uint256) public borrowers;
    mapping(address => uint256) public depositedEthereum;

    event Deposited(address indexed sender, uint256 amount);
    event Withdrawed(address indexed sender, uint256 amount);
    event Borrowed(address indexed borrower, uint256 amount);
    event Returned(address indexed returner, address indexed receiver, uint256 amount);

    constructor(Token _token) {
        token = _token;
    }

    function deposit() public payable {
        depositedEthereum[msg.sender] = msg.value + depositedEthereum[msg.sender];

        emit Deposited(msg.sender, msg.value);
    }

    function withdraw() public {
        require(depositedEthereum[msg.sender] > 0, "Please deposit first, before you can withdraw");

        uint256 etherToSend = depositedEthereum[msg.sender];

        msg.sender.transfer(etherToSend);

        depositedEthereum[msg.sender] = 0;

        // send 10 tokens to the user who withdraw
        token.mint(msg.sender, 10);

        emit Withdrawed(msg.sender, etherToSend);
    }

    function borrow(uint256 amount) public payable {
        require(borrowers[msg.sender] == 0, "You have already borrowed some money");

        token.mint(msg.sender, amount);
        borrowers[msg.sender] = amount;

        emit Borrowed(msg.sender, amount);
    }

    function returnBorrowedMoney(uint256 amount) public payable {
        require(borrowers[msg.sender] > 0, "You haven't borrowed money yet!");
        require(amount > 0, "Please enter an amount greater than 0!");
        require(amount <= borrowers[msg.sender], "Cannot return money greater than the borrowed!");

        token.transferFrom(msg.sender, address(this), amount);
        borrowers[msg.sender] = borrowers[msg.sender] - amount;

        emit Returned(msg.sender, address(this), amount);
    }

    function getKokoTokenBalance() public returns (uint256) {
        return token.balanceOf(address(this));
    }
}
