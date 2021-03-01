<template>
  <div class="d-flex flex-column">
    <div class="container-fluid">
      <accounts-picker v-if="!account" />
    </div>
  </div>
</template>

<script>
/**
 * Internal dependencies.
 */
import useEthereumAccount from '@/composables/use-ethereum-account';
import AccountsPicker from '@/components/accounts-picker/accounts-picker';

export default {
  name: 'App',

  components: {
    AccountsPicker,
  },

  setup() {
    const { account } = useEthereumAccount();

    return {
      account,
    };
  },
};
</script>
