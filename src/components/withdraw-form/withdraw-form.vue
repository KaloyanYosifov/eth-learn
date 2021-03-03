<template>
  <form class="user" @submit.prevent="onSubmit">
    <div class="text-center">
      <h1 class="h4 text-gray-900 mb-4">Amount to withdraw!</h1>
    </div>

    <div class="form-group">
      <number-form-input
          type="number"
          placeholder="amount"
          :min="0.001"
          v-model:value="depositAmount"
      />
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-user btn-block">
        Withdraw
      </button>
    </div>
  </form>
</template>

<script>
/**
 * External dependencies.
 */
import { ref } from 'vue';

/**
 * Internal dependencies.
 */
import useBank from '@/composables/use-bank';
import NumberFormInput from '@/components/number-form-input/number-form-input';

export default {
  name: 'WithdrawForm',

  components: {
    NumberFormInput,
  },

  setup() {
    const depositAmount = ref(0.001);
    const { depositMutation: { mutate } } = useBank();
    const onSubmit = () => {
      mutate(depositAmount.value);
    };

    return {
      onSubmit,
      depositAmount,
    };
  },
};
</script>
