import Web3 from 'web3';

class Ethereum {
    constructor() {
        this.web3 = null;
    }

    async init() {
        if (this.web3){
            return;
        }

        if (!window.web3 && !window.ethereum){
            throw new Error('This is a browser that is not connected to Ethereum! Try metamask!');
        }

        if (window.ethereum) {
            await this._initWithEthereum();
        } else {
            await this._initWithLegacyWeb3();
        }
    }

    async _initWithEthereum(){
        this.web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.enable();

            this.web3.eth.sendTransaction({/* ... */ });
        } catch (error) {
            throw new Error('The user has denied access!');
        }
    }

    async _initWithLegacyWeb3() {
        this.web3 = new Web3(window.web3.currentProvider);
        this.web3 = window.web3; 

        this.web3.eth.sendTransaction({/* ... */ });
    }
}

export default Ethereum;
