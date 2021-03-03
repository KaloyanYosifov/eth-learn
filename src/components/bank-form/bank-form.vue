<template>
  <div class="card o-hidden border-0 shadow-lg my-5 p-4">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1>Bank</h1>

      <button class=" btn btn-sm btn-primary" @click="isDepositing = !isDepositing">
        {{ isDepositing ? 'Go To Wihdraw' : 'Go To Deposit' }}
      </button>
    </div>

    <div class="card-body d-flex justify-content-center">
      <div class="p-5 w-100" style="max-width: 500px;">
        <deposit-form v-if="isDepositing" />
        <withdraw-form v-else />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * External dependencies.
 */
import { ref } from 'vue';

/**
 * Internal dependencies.
 */
import DepositForm from '@/components/deposit-form/deposit-form';
import WithdrawForm from '@/components/withdraw-form/withdraw-form';

export default {
  name: 'BankForm',

  components: {
    WithdrawForm,
    DepositForm,
  },

  setup() {
    const isDepositing = ref(true);

    return {
      isDepositing,
    };
  },
};
</script>
