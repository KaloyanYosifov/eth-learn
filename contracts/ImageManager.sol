// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

contract ImageManager {
    struct Image {
        string url;
        uint256 price;
    }

    mapping(address => Image[]) public images;
    mapping(address => uint) public imagesCount;

    function addImage(string memory _url, uint256 _price) public payable {
        images[msg.sender].push(Image(_url, _price));
        imagesCount[msg.sender] = images[msg.sender].length;
    }
}
