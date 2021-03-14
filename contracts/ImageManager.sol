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

    function addImage(string memory _url, uint256 _price) public payable {
        bytes32 imageId = keccak256(abi.encode(_url, _price, msg.sender, blockhash(block.number)));

        images[msg.sender][imageId] = Image(imageId, _url, _price);
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

        // remove the image from the seller
        delete images[_sellerAddress][_imageId];
        delete imagesToAccount[_sellerAddress][foundImageIndex];

        // add a pending withdraw for seller
        pendingWithdrawals[_sellerAddress] += msg.value;
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
