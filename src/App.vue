<template>
  <ul v-if="accounts" class="accounts">
    <li v-for="account in accounts" :key="account">{{ account }}</li>
  </ul>
</template>

<script>
/**
 * External dependencies.
 */
import useEthereum from '@/composables/use-ethereum';

/**
 * Internal dependencies.
 */

export default {
  name: 'App',

  setup() {
    const { accounts } = useEthereum();

    return {
      accounts,
    };
  },
};
</script>
