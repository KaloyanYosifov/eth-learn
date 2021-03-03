<template>
  <form class="user" @submit.prevent="onSubmit">
    <div class="text-center">
      <h1 class="h4 text-gray-900 mb-4">Amount to deposit!</h1>
    </div>

    <div class="form-group">
      <number-form-input
          type="number"
          placeholder="amount"
          :max="50"
          :min="0.001"
          v-model:value="depositAmount"
      />
    </div>

    <div class="form-group">
      <button
          type="submit"
          class="btn btn-primary btn-user btn-block"
      >
        <template v-if="!isDepositing">
          Deposit
        </template>

        <span v-else class="d-flex justify-content-center">
          <half-circle-spinner
              :animation-duration="1000"
              :size="16"
              color="#fff"
          />
        </span>
      </button>
    </div>
  </form>
</template>

<script>
/**
 * External dependencies.
 */
import { ref } from 'vue';
import { HalfCircleSpinner } from 'epic-spinners';

/**
 * Internal dependencies.
 */
import useBank from '@/composables/use-bank';
import NumberFormInput from '@/components/number-form-input/number-form-input';

export default {
  name: 'DepositForm',

  components: {
    NumberFormInput,
    HalfCircleSpinner,
  },

  setup() {
    const depositAmount = ref(0.001);
    const { depositMutation: { mutate: deposit, isLoading: isDepositing } } = useBank();
    const onSubmit = async () => {
      try {
        await deposit(depositAmount.value);

        depositAmount.value = 0.001;

        alert('Successfully deposited!');
      } catch (e) {
        alert(e.message);
      }
    };

    return {
      onSubmit,
      isDepositing,
      depositAmount,
    };
  },
};
</script>
