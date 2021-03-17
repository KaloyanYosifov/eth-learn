// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

contract ImageManager {
    struct Image {
        bytes32 id;
        string url;
        uint256 price;
    }

    mapping(address => uint) pendingWithdrawals;
    mapping(address => bytes32[]) public imagesToAccount;
    mapping(address => mapping(bytes32 => Image)) public images;

    function addImage(string memory _url) public payable {
        bytes32 imageId = keccak256(abi.encode(_url, msg.value, msg.sender, blockhash(block.number)));

        images[msg.sender][imageId] = Image(imageId, _url, msg.value);
        imagesToAccount[msg.sender].push(imageId);
    }

    function buyImage(bytes32 _imageId, address _sellerAddress) public payable {
        uint foundImageIndex = 0;
        bool foundImage = false;

        for (uint i = 0; i < imagesToAccount[_sellerAddress].length; i++) {
            bytes32 currentImageId = imagesToAccount[_sellerAddress][i];

            if (currentImageId == _imageId) {
                foundImageIndex = i;
                foundImage = true;
            }
        }

        require(foundImage == true, "Image not found!");

        // move image to buyer
        Image memory imageBought = images[_sellerAddress][_imageId];
        images[msg.sender][_imageId] = imageBought;
        imagesToAccount[msg.sender].push(_imageId);

        // remove the image from the seller
        delete images[_sellerAddress][_imageId];

        // update the new images account of the seller
        bytes32[] storage newImagesToAccount;
        for (uint i = 0; i < imagesToAccount[_sellerAddress].length; i++) {
            if (foundImageIndex == i) {
                continue;
            }

            newImagesToAccount.push(imagesToAccount[_sellerAddress][i]);
        }
        imagesToAccount[_sellerAddress] = newImagesToAccount;

        // add a pending withdraw for seller
        pendingWithdrawals[_sellerAddress] += imageBought.price;
    }

    function withdraw() public {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    function getImagesCountForAccount() public view returns (uint imageCount) {
        return imagesToAccount[msg.sender].length;
    }
}
