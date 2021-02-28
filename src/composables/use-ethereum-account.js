/**
 * External dependencies.
 */
import { ref, watch } from 'vue';
import { useQuery } from '@cytools/vue-query';

/**
 * Internal dependencies.
 */
import useEthereum from '@/composables/use-ethereum';

export default function useEthereumAccount() {
    const { web3, accountsQuery } = useEthereum();
    const { data: accounts } = accountsQuery;
    const account = ref(null);
    const balanceQuery = useQuery(
        ['ethereum-account', account],
        async acc => {
            if (!acc) {
                return null;
            }

            return web3.utils.fromWei(await web3.eth.getBalance(acc));
        },
    );

    watch(accounts, newAccounts => {
        if (!newAccounts.length) {
            return;
        }

        account.value = newAccounts[0];
    });

    return {
        balanceQuery,
    };
}
