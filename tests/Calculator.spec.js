const ganache = require('ganache-core');
const Web3 = require('web3');


console.log('test');
console.log(ganache.provider());
// const web3Instance = new Web3(ganache.provider());

describe('Calculator solidity', () => {
    it('gets the accounts', async () => {
        console.log(await web3Instance.eth.getAccounts());
    });
});
