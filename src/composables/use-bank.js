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
    const { account, balanceQuery: { updateQueryData } } = useEthereumAccount();
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
            const result = await bank.value.methods
                .deposit()
                .send({ value: web3.utils.toWei(amount.toString(), 'ether'), from: account.value });

            console.log(result);

            return amount;
        },
        {
            onError: error => alert(error.message),
            onSuccess: amount => updateQueryData(balance => balance - amount),
        },
    );

    return {
        bankQuery,
        depositMutation,
    };
}
