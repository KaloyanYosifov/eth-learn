/**
 * External dependencies.
 */
import Web3 from 'web3';
import { useQuery } from '@cytools/vue-query';

let web3 = null;
export default function useEthereum() {
    if (!web3) {
        if (!window.ethereum) {
            throw new Error('This is a browser that is not connected to Ethereum! Try metamask!');
        }

        web3 = new Web3(window.ethereum);
    }
    const { data: accounts } = useQuery(
        'ethereum-accounts',
        web3.eth.getAccounts,
        {
            defaultData: [],
        },
    );

    return {
        web3,
        accounts,
    };
}
