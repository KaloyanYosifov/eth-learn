<template>
  <div class="card o-hidden border-0 shadow-lg my-5 p-4">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1>Bank</h1>

      {{ images }}

      <button v-if="currentFormState !== 'deposit'" class=" btn btn-sm btn-primary" @click="currentFormState = 'deposit'">
        Go To Deposit
      </button>

      <button v-if="currentFormState !== 'withdraw'" class=" btn btn-sm btn-primary" @click="currentFormState = 'withdraw'">
        Go To Withdraw
      </button>

      <button v-if="currentFormState !== 'borrow'" class=" btn btn-sm btn-primary" @click="currentFormState = 'borrow'">
        Go To Borrow
      </button>
    </div>

    <div class="card-body d-flex justify-content-center">
      <div class="p-5 w-100" style="max-width: 500px;">
        <deposit-form v-if="currentFormState === 'deposit'" />
        <withdraw-form v-if="currentFormState === 'withdraw'" />
        <borrow-form v-if="currentFormState === 'borrow'" />
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
import BorrowForm from '@/components/borrow-form/borrow-form';
import DepositForm from '@/components/deposit-form/deposit-form';
import WithdrawForm from '@/components/withdraw-form/withdraw-form';
import useAccountImages from '@/composables/use-account-images';
import useEthereumAccount from '@/composables/use-ethereum-account';

export default {
  name: 'BankForm',

  components: {
    BorrowForm,
    WithdrawForm,
    DepositForm,
  },

  setup() {
    const currentFormState = ref('deposit');
    const { account } = useEthereumAccount();
    const { accountImagesQuery: { data: images } } = useAccountImages({
      account,
    });

    return {
      images,
      currentFormState,
    };
  },
};
</script>
