/**
 * External dependencies.
 */
import chai, { expect } from 'chai';
import { solidityError } from './helpers';

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
            web3.utils.toWei('2'),
            'https://image.shutterstock.com/image-photo/washington-dc-usa-jan-6th-260nw-1888591864.jpg',
            { from: account },
        );

        expect(Number(await imageManager.getImagesCountForAccount({ from: account }))).to.equal(1);
    });

    it('an investor can buy an image', async () => {
        await imageManager.addImage(
            web3.utils.toWei('2'),
            'https://image.shutterstock.com/image-photo/washington-dc-usa-jan-6th-260nw-1888591864.jpg',
            { from: account },
        );
        const imageAddressBelongingToCreator = await imageManager.imagesToAccount(account, 0);

        expect(Number(await imageManager.getImagesCountForAccount({ from: account }))).to.equal(1);

        await imageManager.buyImage(
            imageAddressBelongingToCreator,
            account,
            { from: investor, value: web3.utils.toWei('2') },
        );

        expect(Number(await imageManager.getImagesCountForAccount({ from: account }))).to.equal(0);
        expect(Number(await imageManager.getImagesCountForAccount({ from: investor }))).to.equal(1);
    });

    it('the seller can withdraw the money from the sold image', async () => {
        await imageManager.addImage(
            web3.utils.toWei('2'),
            'https://image.shutterstock.com/image-photo/washington-dc-usa-jan-6th-260nw-1888591864.jpg',
            { from: account },
        );
        const imageAddressBelongingToCreator = await imageManager.imagesToAccount(account, 0);
        const balanceBeforeSell = Number(await web3.eth.getBalance(account));

        await imageManager.buyImage(
            imageAddressBelongingToCreator,
            account,
            { from: investor, value: web3.utils.toWei('2') },
        );
        await imageManager.withdraw({ from: account });

        expect(Number(await web3.eth.getBalance(account))).to.be.greaterThan(balanceBeforeSell);
    });

    it('an error is thrown when the money is not exactly the price of the image', async () => {
        await imageManager.addImage(
            web3.utils.toWei('2'),
            'https://image.shutterstock.com/image-photo/washington-dc-usa-jan-6th-260nw-1888591864.jpg',
            { from: account },
        );
        const imageAddressBelongingToCreator = await imageManager.imagesToAccount(account, 0);

        await imageManager.buyImage(
            imageAddressBelongingToCreator,
            account,
            { from: investor, value: web3.utils.toWei('1.8') },
        )
            .should
            .be
            .rejectedWith(solidityError('You must pay the exact price of the image!'));

        await imageManager.buyImage(
            imageAddressBelongingToCreator,
            account,
            { from: investor, value: web3.utils.toWei('2.1') },
        )
            .should
            .be
            .rejectedWith(solidityError('You must pay the exact price of the image!'));
    });
});
