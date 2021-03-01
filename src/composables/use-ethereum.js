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

    const accountsQuery = useQuery(
        'ethereum-accounts',
        web3.eth.getAccounts,
        {
            manual: true,
            defaultData: [],
        },
    );
    const initBlockChain = async () => {
        try {
            await web3.eth.requestAccounts();
        } catch (error) {
            throw new Error('Cannot proceed without enabling metamask!');
        }
        await accountsQuery.fetchFromCacheOrRefetch();
    };

    void initBlockChain();

    return {
        web3,
        accountsQuery,
    };
}
