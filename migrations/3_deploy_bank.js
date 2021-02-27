/**
 * Internal dependencies.
 */
const Bank = artifacts.require('Bank');
const Token = artifacts.require('Token');

module.exports = async (deployer) => {
    const token = await Token.deployed();

    await deployer.deploy(Bank, token.address);

    const bank = await Bank.deployed();

    // transfer ownership
    await token.transferMinterOwnership(bank.address);
};
