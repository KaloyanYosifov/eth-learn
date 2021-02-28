/**
 * External dependencies.
 */
const expect = require('chai').expect;

/**
 * Internal dependencies.
 */
const Bank = artifacts.require('Bank');
const Token = artifacts.require('Token');

contract('Bank', async ([deployer, account]) => {
    let bank = null;
    let token = null;

    beforeEach(async () => {
        token = await Token.new({ from: deployer });
        bank = await Bank.new(token.address, { from: deployer });

        await token.transferMinterOwnership(bank.address);
    });

    it('can deposit ether to bank', async () => {
        const previousBalanceOfAccount = Number(await web3.eth.getBalance(account));

        await bank.deposit({ value: web3.utils.toWei('0.003', 'ether'), from: account });

        expect(Number(await web3.eth.getBalance(account))).to.lessThan(previousBalanceOfAccount);
    });

    it('can withdraw deposit and receive 10 koko tokens', async () => {
        expect(Number(await token.balanceOf(account))).to.equal(0);

        await bank.deposit({ value: web3.utils.toWei('0.003', 'ether'), from: account });

        const previousBalanceOfAccount = Number(await web3.eth.getBalance(account));

        expect(Number(await token.balanceOf(account))).to.equal(0);
        expect(Number(await bank.depositedEthereum(account))).to.equal(Number(web3.utils.toWei('0.003', 'ether')));

        await bank.withdraw({ from: account });

        expect(Number(await bank.depositedEthereum(account))).to.equal(0);
        expect(Number((await token.balanceOf(account)).toString())).to.equal(10);
        expect(Number(await web3.eth.getBalance(account))).to.be.greaterThan(previousBalanceOfAccount);
    });
});
