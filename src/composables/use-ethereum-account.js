/**
 * External dependencies.
 */
import { useMutation, useQuery } from '@cytools/vue-query';

/**
 * Internal dependencies.
 */
import useEthereum from '@/composables/use-ethereum';

export default function useEthereumAccount() {
    const { web3 } = useEthereum();
    const {
        data: account,
        updateQueryData,
    } = useQuery(
        'active-ethereum-account',
        () => Promise.resolve(window.localStorage.getItem('active-ethereum-account')),
    );
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
        ['ethereum-account', account],
        async acc => {
            if (!acc) {
                return null;
            }

            return web3.utils.fromWei(await web3.eth.getBalance(acc));
        },
    );

    return {
        account,
        balanceQuery,
        selectAccount,
    };
}
