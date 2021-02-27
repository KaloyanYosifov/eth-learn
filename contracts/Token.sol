// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public minter;

    event MinterChanged(address indexed from, address to);

    constructor() payable ERC20("Koko Token", "KT") {
        // set the minter to the one who deploys the contract
        minter = msg.sender;
    }

    function transferMinterOwnership(address newMinter) public returns (bool) {
        require(minter == msg.sender, "Only the minter can issue new tokens");

        minter = newMinter;

        emit MinterChanged(msg.sender, newMinter);
        return true;
    }

    function mint(address account, uint256 amount) public {
        require(minter == msg.sender, "Only the minter can issue new tokens");

        // issue new tokens to the account
        _mint(account, amount);
    }
}
