/**
 * External dependencies.
 */
import { useQuery } from '@cytools/vue-query';

/**
 * Internal dependencies.
 */
import Bank from '../../build/contracts/Bank.json';
import useEthereum from '@/composables/use-ethereum';

export default function useBank() {
    const { web3 } = useEthereum();
    const bankQuery = useQuery(
        'bank',
        async () => {
            const netId = await web3.eth.net.getId();

            return new web3.eth.Contract(Bank.abi, Bank.networks[netId].address);
        },
    );

    return {
        bankQuery,
    };
}
