<template>
  <form class="user" @submit.prevent="onSubmit">
    <div class="form-group">
      <number-form-input
          type="number"
          placeholder="amount"
          :max="50"
          :min="0.001"
          v-model:value="depositAmount"
          @input:value="gangas"
      />
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-user btn-block">
        Deposit {{ depositAmount }}
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
  name: 'DepositForm',

  components: {
    NumberFormInput,
  },

  setup() {
    const depositAmount = ref(0.001);
    const { depositMutation: { mutate } } = useBank();
    const onSubmit = () => {
      mutate(depositAmount.value);
    };
    const gangas = v => {
      console.log(v);
    };

    return {
      onSubmit,
      gangas,
      depositAmount,
    };
  },
};
</script>
