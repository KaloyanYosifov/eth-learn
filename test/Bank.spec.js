/**
 * External dependencies.
 */
import chai, { expect } from 'chai';

/**
 * Internal dependencies.
 */
const Bank = artifacts.require('Bank');
const Token = artifacts.require('Token');
import { solidityError } from './helpers';

chai
    .use(require('chai-as-promised'))
    .should();

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

    it('can lend money in Koko Tokens', async () => {
        expect(Number(await token.balanceOf(account))).to.equal(0);

        await bank.borrow(web3.utils.toWei('50'), { from: account });

        expect(Number(web3.utils.fromWei(await token.balanceOf(account)))).to.equal(50);
    });

    it.only('can not lend money twice to the same account', async () => {
        expect(Number(await token.balanceOf(account))).to.equal(0);

        await bank.borrow(web3.utils.toWei('50'), { from: account });

        expect(Number(web3.utils.fromWei(await token.balanceOf(account)))).to.equal(50);

        await bank.borrow(web3.utils.toWei('20'), { from: account })
            .should
            .be
            .rejectedWith(solidityError('You have already borrowed some money'));

        expect(Number(web3.utils.fromWei(await token.balanceOf(account)))).to.equal(50);
    });

    it('throws an error if the user tries to withdraw but never has deposited', async () => {
        await bank.withdraw({ from: account }).should.be.rejectedWith(solidityError('Please deposit first, before you can withdraw'));
    });
});
