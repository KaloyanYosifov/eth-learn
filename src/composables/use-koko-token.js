/**
 * External dependencies.
 */
import { useQuery } from '@cytools/vue-query';

/**
 * Internal dependencies.
 */
import Token from '../../build/contracts/Token.json';
import useEthereum from '@/composables/use-ethereum';

export default function useKokoToken() {
    const { web3 } = useEthereum();
    const tokenQuery = useQuery(
        'koko-token',
        async () => {
            const netId = await web3.eth.net.getId();
            return new web3.eth.Contract(Token.abi, Token.networks[netId].address);
        },
    );

    return {
        tokenQuery,
    };
}
