/**
 * External dependencies.
 */
import { useMutation, useQuery } from '@cytools/vue-query';

/**
 * Internal dependencies.
 */
import useEthereum from '@/composables/use-ethereum';
import useKokoToken from '@/composables/use-koko-token';

export default function useEthereumAccount() {
    const { web3 } = useEthereum();
    const {
        data: account,
        updateQueryData,
    } = useQuery(
        'active-ethereum-account',
        () => Promise.resolve(window.localStorage.getItem('active-ethereum-account')),
    );
    const { tokenQuery: { data: token } } = useKokoToken();
    const { mutate: selectAccount } = useMutation(
        (acc) => {
            window.localStorage.setItem('active-ethereum-account', acc);

            return Promise.resolve(acc);
        },
        {
            onSuccess: acc => updateQueryData(() => acc),
        },
    );
    const balanceQuery = useQuery(
        ['ethereum-account-balance', account],
        async acc => {
            if (!acc) {
                return null;
            }

            return web3.utils.fromWei(await web3.eth.getBalance(acc));
        },
    );
    const kokoTokenBalanceQuery = useQuery(
        ['account-koko-token-balance', account, token],
        async (acc, tok) => web3.utils.fromWei(await tok.methods.balanceOf(acc).call({ from: acc })),
        {
            onError: error => alert(error.message),
        },
    );

    return {
        account,
        balanceQuery,
        selectAccount,
        kokoTokenBalanceQuery,
    };
}
