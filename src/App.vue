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
 * Internal dependencies.
 */
import useEthereum from '@/composables/use-ethereum';
import useEthereumAccount from '@/composables/use-ethereum-account';

export default {
  name: 'App',

  setup() {
    const { accountsQuery: { data: accounts } } = useEthereum();
    const { balanceQuery: { data: balance } } = useEthereumAccount();

    return {
      balance,
      accounts,
    };
  },
};
</script>
