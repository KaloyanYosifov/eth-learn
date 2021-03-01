<template>
  <div class="d-flex flex-column">
    <div class="container-fluid">
      <accounts-picker />
    </div>
  </div>
</template>

<script>
/**
 * Internal dependencies.
 */
import AccountsPicker from '@/components/accounts-picker/accounts-picker';

export default {
  name: 'NoAccount',
  components: { AccountsPicker },
};

</script>
