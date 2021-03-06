<template>
  <form class="user" @submit.prevent="onSubmit">
    <div class="text-center">
      <h1 class="h4 text-gray-900 mb-4">Click button to borrow!</h1>
    </div>

    <div class="form-group">
      <number-form-input
          type="number"
          placeholder="amount"
          :max="2000"
          :min="1"
          v-model:value="borrowAmount"
      />
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-user btn-block">
        <template v-if="!isBorrowingMoney">
          Borrow
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
  name: 'BorrowForm',

  components: {
    NumberFormInput,
    HalfCircleSpinner,
  },

  setup() {
    const borrowAmount = ref(1);
    const { borrowMutation: { mutate: borrow, isLoading: isBorrowingMoney } } = useBank();
    const onSubmit = async () => {
      const { isError } = await borrow(borrowAmount.value);

      if (isError.value) {
        alert('Transaction has been declined!');
        return;
      }

      alert('Successfully borrowed!');
    };

    return {
      onSubmit,
      borrowAmount,
      isBorrowingMoney,
    };
  },
};
</script>
