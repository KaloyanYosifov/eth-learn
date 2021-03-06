/**
 * External dependencies.
 */
import { useMutation, useQuery } from '@cytools/vue-query';

/**
 * Internal dependencies.
 */
import Bank from '../../build/contracts/Bank.json';
import useEthereum from '@/composables/use-ethereum';
import useEthereumAccount from '@/composables/use-ethereum-account';

export default function useBank() {
    const { web3 } = useEthereum();
    const {
        account,
        balanceQuery: { updateQueryData, refetch: refetchBalance },
        kokoTokenBalanceQuery: { refetch: refetchKokoTokenBalance },
    } = useEthereumAccount();
    const bankQuery = useQuery(
        'bank',
        async () => {
            const netId = await web3.eth.net.getId();

            return new web3.eth.Contract(Bank.abi, Bank.networks[netId].address);
        },
    );
    const bank = bankQuery.data;
    const depositMutation = useMutation(
        async (amount) => {
            await bank.value.methods
                .deposit()
                .send({ value: web3.utils.toWei(amount.toString(), 'ether'), from: account.value });

            return amount;
        },
        {
            onSuccess: amount => updateQueryData(balance => balance - amount),
        },
    );
    const withdrawMutation = useMutation(
        async () => {
            await bank.value.methods
                .withdraw()
                .send({ from: account.value });

            await Promise.all([
                refetchBalance(),
                refetchKokoTokenBalance(),
            ]);
        },
    );
    const borrowMutation = useMutation(
        async (amount) => {
            await bank.value.methods
                .borrow(web3.utils.toWei(amount.toString(), 'ether'))
                .send({ from: account.value });

            await refetchKokoTokenBalance();
        },
    );

    return {
        bankQuery,
        borrowMutation,
        depositMutation,
        withdrawMutation,
    };
}
