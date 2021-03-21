/**
 * Internal dependencies.
 */
const ImageManager = artifacts.require('ImageManager');

module.exports = async (deployer) => {
    deployer.deploy(ImageManager);
};
