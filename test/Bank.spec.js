/**
 * External dependencies.
 */
const expect = require('chai').expect;

/**
 * Internal dependencies.
 */
const Bank = artifacts.require('Bank');
const Token = artifacts.require('Token');

contract('Bank', async accounts => {
    const firstAccount = accounts[0];
    let bank = null;
    let token = null;

    beforeEach(async () => {
        token = await Token.new({ from: firstAccount });
        bank = await Bank.new(token.address, { from: firstAccount });

        await token.transferMinterOwnership(bank.address);
    });

    it('it can deposit money to address', async () => {
        const firstAccount = accounts[0];
        const previousBalanceOfAccount = Number((await web3.eth.getBalance(firstAccount)).toString());

        await bank.deposit({ value: web3.utils.toWei('0.003', 'ether'), from: firstAccount });

        const newBalanceOfAccount = Number((await web3.eth.getBalance(firstAccount)).toString());
        expect(newBalanceOfAccount).to.eq(previousBalanceOfAccount - Number(web3.utils.toWei('0.003', 'ether')));
    });
});
