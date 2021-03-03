<template>
  <div class="card o-hidden border-0 shadow-lg my-5">
    <div class="card-body d-flex justify-content-center">
      <div class="p-5 w-100" style="max-width: 500px;">
        <div class="text-center">
          <h1 class="h4 text-gray-900 mb-4">Enter the amount you want to deposit!</h1>
        </div>

        <deposit-form />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Internal dependencies.
 */
import DepositForm from '@/components/deposit-form/deposit-form';

export default {
  name: 'BankForm',

  components: { DepositForm },
};
</script>
