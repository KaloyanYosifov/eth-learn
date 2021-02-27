// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "./Token.sol";

contract Bank {
    Token private token;

    event Deposited(address indexed sender, uint256 value);

    constructor(Token _token) {
        token = _token;
    }

    function deposit() public payable returns (bool) {
        token.mint(msg.sender, msg.value);

        emit Deposited(msg.sender, msg.value);

        return true;
    }
}
