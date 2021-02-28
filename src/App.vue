<template>
  <div>
    Balance: {{ balance }}
  </div>
  <ul v-if="accounts" class="accounts">
    <li v-for="account in accounts" :key="account">{{ account }}</li>
  </ul>
</template>

<script>
/**
 * External dependencies.
 */
import { watch } from 'vue';

/**
 * Internal dependencies.
 */
import useEthereum from '@/composables/use-ethereum';
import useEthereumAccount from '@/composables/use-ethereum-account';
import useBank from '@/composables/use-bank';

export default {
  name: 'App',

  setup() {
    const { bankQuery: { data: bank } } = useBank();
    const { web3, accountsQuery: { data: accounts } } = useEthereum();
    const { account, balanceQuery: { data: balance } } = useEthereumAccount();

    watch([account, bank], async ([acc, bk]) => {
      if (!acc || !bk) {
        return;
      }

      await bk.methods.deposit().send({ value: web3.utils.toWei('0.02', 'ether'), from: acc });
      await bk.methods.withdraw().send({ value: web3.utils.toWei('0', 'ether'), from: acc });
    });

    return {
      balance,
      accounts,
    };
  },
};
</script>
