<template>
  <navigation />

  <div class="d-flex flex-column">
    <div class="container-fluid">
      <bank-form />
    </div>
  </div>
</template>

<script>
/**
 * Internal dependencies.
 */
import BankForm from '@/components/bank-form/bank-form';
import Navigation from '@/components/navigation/navigation';

export default {
  name: 'HasAccount',
  components: {
    BankForm,
    Navigation,
  },
};
</script>
