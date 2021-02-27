// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "./Token.sol";

contract Bank {
    Token private token;

    constructor(Token _token) {
        token = _token;
    }

    function deposit(uint256 value) public payable returns (bool) {
        token.mint(msg.sender, value);

        return true;
    }
}
