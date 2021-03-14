// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

contract ImageManager {
    struct Image {
        bytes32 id;
        string url;
        uint256 price;
    }

    mapping(address => uint) pendingWithdrawals;
    mapping(address => uint) public imagesCount;
    mapping(address => mapping(uint => Image)) public images;

    function addImage(string memory _url, uint256 _price) public payable {
        bytes32 imageId = keccak256(abi.encode(_url, _price, msg.sender, blockhash(block.number)));

        images[msg.sender][imagesCount[msg.sender]] = Image(imageId, _url, _price);
        imagesCount[msg.sender] += 1;
    }

    function buyImage(bytes32 _imageId, address _sellerAddress) public payable {
        Image memory image;
        uint imageIndex;

        for (uint i = 0; i < imagesCount[_sellerAddress]; i++) {
            if (images[_sellerAddress][i].id == _imageId) {
                image = images[_sellerAddress][i];
                imageIndex = i;
            }
        }

        require(image.id != 0, "Image not found!");

        // remove the image from the seller
        delete images[_sellerAddress][imageIndex];

        // add a pending withdraw for seller
        pendingWithdrawals[_sellerAddress] += msg.value;
    }

    function withdraw() public {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
    }
}
