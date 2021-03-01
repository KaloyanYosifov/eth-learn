<template>
  <h3 class="text-center">Choose an account</h3>

  <div v-if="accounts.length" class="row">
    <div
        v-for="account in accounts"
        :key="account"
        class="col-lg-6 mb-4"
        style="cursor: pointer;"
        @click="selectAccount(account)"
    >
      <div class="card bg-dark text-white shadow">
        <div class="card-body">
          {{ account }}
          <div class="text-white-50 small">{{ generateRandomColor() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Internal dependencies.
 */
import useEthereum from '@/composables/use-ethereum';
import useRandomColors from '@/composables/use-random-colors';
import useEthereumAccount from '@/composables/use-ethereum-account';

export default {
  name: 'AccountsPicker',

  setup() {
    const { selectAccount } = useEthereumAccount();
    const { generateRandomColor } = useRandomColors();
    const { accountsQuery: { data: accounts } } = useEthereum();

    return {
      accounts,
      selectAccount,
      generateRandomColor,
    };
  },
};
</script>
