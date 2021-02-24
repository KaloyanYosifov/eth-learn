<template>
  <ul class="todos">
    <li>Here</li>
  </ul>
</template>

<script>
/**
 * External dependencies.
 */
import { onMounted } from 'vue';

/**
 * Internal dependencies.
 */
import Ethereum from '@/Ethereum';

export default {
  name: 'App',

  setup() {
    let ethereum = null;

    onMounted(() => {
      ethereum = new Ethereum();
      void ethereum.init();
    });

    return {
    }
  }
}
</script>
