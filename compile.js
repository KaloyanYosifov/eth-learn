const fs = require('fs');
const path = require('path');
const solc = require('solc');

const contractSource = fs.readFileSync(path.resolve(__dirname, 'contracts', 'Calculator.sol'), 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Calculator.sol' : {
            content: contractSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Calculator.sol'];
