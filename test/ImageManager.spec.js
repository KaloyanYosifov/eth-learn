/**
 * External dependencies.
 */
import chai, { expect } from 'chai';

/**
 * Internal dependencies.
 */
const ImageManager = artifacts.require('ImageManager');

chai
    .use(require('chai-as-promised'))
    .should();

contract('Token', async ([deployer, account, investor]) => {
    let imageManager = null;

    beforeEach(async () => {
        imageManager = await ImageManager.new({ from: deployer });
    });

    it('can add image', async () => {
        expect(Number(await imageManager.getImagesCountForAccount({ from: account }))).to.equal(0);

        await imageManager.addImage(
            'https://image.shutterstock.com/image-photo/washington-dc-usa-jan-6th-260nw-1888591864.jpg',
            { from: account, value: web3.utils.toWei('2') },
        );

        expect(Number(await imageManager.getImagesCountForAccount({ from: account }))).to.equal(1);
    });

    it('an investor can buy an image', async () => {
        await imageManager.addImage(
            'https://image.shutterstock.com/image-photo/washington-dc-usa-jan-6th-260nw-1888591864.jpg',
            { from: account, value: web3.utils.toWei('2') },
        );
        const imageAddressBelongingToCreator = await imageManager.imagesToAccount(account, 0);

        expect(Number(await imageManager.getImagesCountForAccount({ from: account }))).to.equal(1);

        await imageManager.buyImage(
            imageAddressBelongingToCreator,
            account,
            { from: investor },
        );

        expect(Number(await imageManager.getImagesCountForAccount({ from: account }))).to.equal(0);
        expect(Number(await imageManager.getImagesCountForAccount({ from: investor }))).to.equal(1);
    });

    it.only('the seller can withdraw the money from the sold image', async () => {
        await imageManager.addImage(
            'https://image.shutterstock.com/image-photo/washington-dc-usa-jan-6th-260nw-1888591864.jpg',
            { from: account, value: web3.utils.toWei('2') },
        );
        const imageAddressBelongingToCreator = await imageManager.imagesToAccount(account, 0);
        const balanceBeforeSell = Number(await web3.eth.getBalance(account));

        await imageManager.buyImage(
            imageAddressBelongingToCreator,
            account,
            { from: investor },
        );
        await imageManager.withdraw({ from: account });

        expect(Number(await web3.eth.getBalance(account))).to.be.greaterThan(balanceBeforeSell);
    });
});
