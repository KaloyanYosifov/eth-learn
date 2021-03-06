<template>
  <form class="user" @submit.prevent="onSubmit">
    <div class="text-center">
      <h1 class="h4 text-gray-900 mb-4">Click button to withdraw!</h1>
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-user btn-block">
        <template v-if="!isWithdrawing">
          Withdraw
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
import { HalfCircleSpinner } from 'epic-spinners';

/**
 * Internal dependencies.
 */
import useBank from '@/composables/use-bank';

export default {
  name: 'WithdrawForm',

  components: {
    HalfCircleSpinner,
  },

  setup() {
    const { withdrawMutation: { mutate: withdraw, isLoading: isWithdrawing } } = useBank();
    const onSubmit = async () => {
      const { isError } = await withdraw();

      if (isError.value) {
        alert('Transaction has been declined!');
        return;
      }

      alert('Successfully withdrawed!');
    };

    return {
      onSubmit,
      isWithdrawing,
    };
  },
};
</script>
