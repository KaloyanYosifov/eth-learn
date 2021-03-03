<template>
  <form class="user">
    <div class="form-group">
      <number-form-input
          type="number"
          placeholder="amount"
          :max="50"
          :min="0.00001"
      />
    </div>
  </form>
</template>

<script>
/**
 * Internal dependencies.
 */
import NumberFormInput from '@/components/number-form-input/number-form-input';

export default {
  name: 'DepositForm',

  components: {
    NumberFormInput,
  },
};
</script>
