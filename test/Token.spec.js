/**
 * External dependencies.
 */
import chai, { expect } from 'chai';

/**
 * Internal dependencies.
 */
const Token = artifacts.require('Token');

chai
    .use(require('chai-as-promised'))
    .should();

contract('Token', async ([deployer, account]) => {
    let token = null;

    beforeEach(async () => {
        token = await Token.new({ from: deployer });
    });

    it('has a name', async () => {
        expect(await token.name()).to.equal('Koko Token');
    });

    it('has a symbol', async () => {
        expect(await token.symbol()).to.equal('KT');
    });

    it('has a total supply', async () => {
        expect(Number(await token.totalSupply())).to.equal(0);

        await token.mint(account, web3.utils.toWei('30', 'ether'));

        expect(Number(await token.totalSupply())).to.equal(Number(web3.utils.toWei('30', 'ether')));
    });

    it('can issue new tokens to users', async () => {
        expect(Number(await token.balanceOf(account))).to.equal(0);

        await token.mint(account, web3.utils.toWei('40', 'ether'));

        expect(Number(await token.balanceOf(account))).to.equal(Number(web3.utils.toWei('40', 'ether')));
    });
});
