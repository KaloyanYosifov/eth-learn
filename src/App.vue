<template>
  <has-account v-if="account" />
  <no-account v-else />
</template>

<script>
/**
 * Internal dependencies.
 */
import NoAccount from '@/components/no-account/no-account';
import HasAccount from '@/components/has-account/has-account';
import useEthereumAccount from '@/composables/use-ethereum-account';

export default {
  name: 'App',

  components: {
    NoAccount,
    HasAccount,
  },

  setup() {
    const { account } = useEthereumAccount();

    return {
      account,
    };
  },
};
</script>
