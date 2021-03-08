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

contract('Token', async ([deployer, account]) => {
    let imageManager = null;

    beforeEach(async () => {
        imageManager = await ImageManager.new({ from: deployer });
    });

    it.only('can add image', async () => {
        expect(Number(await imageManager.imagesCount(account))).to.equal(0);

        await imageManager.addImage(
            'https://image.shutterstock.com/image-photo/washington-dc-usa-jan-6th-260nw-1888591864.jpg',
            web3.utils.toWei('2'),
            { from: account },
        );

        expect(Number(await imageManager.imagesCount(account))).to.equal(1);
    });
});
