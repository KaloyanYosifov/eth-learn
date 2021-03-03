<template>
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <div class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
      Koko Bank
    </div>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown no-arrow mx-1">
        <div
            class="nav-link d-flex align-items-center"
            href="#"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
          Bal:
          <span v-if="isRetrievingBalance" class="pl-2">
            <half-circle-spinner
                :animation-duration="1000"
                :size="16"
                color="#ff1d5e"
            />
          </span>

          <span v-else class="ml-2 badge badge-danger badge-counter">{{ balance }}</span>
        </div>
      </li>
      <li class="nav-item dropdown no-arrow mx-1">
        <div
            class="nav-link d-flex align-items-center"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
          Koko Token Bal:
          <span v-if="isRetrievingKokoTokenBalance" class="pl-2">
            <half-circle-spinner
                :animation-duration="1000"
                :size="16"
                color="#ff1d5e"
            />
          </span>

          <span v-else class="ml-2 badge badge-danger badge-counter">{{ kokoTokenBalance }}</span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
/**
 * External dependencies.
 */
import { HalfCircleSpinner } from 'epic-spinners';

/**
 * Internal dependencies.
 */
import useEthereumAccount from '@/composables/use-ethereum-account';

export default {
  name: 'Navigation',

  components: {
    HalfCircleSpinner,
  },

  setup() {
    const {
      balanceQuery: { data: balance, isLoading: isRetrievingBalance },
      kokoTokenBalanceQuery: { data: kokoTokenBalance, isLoading: isRetrievingKokoTokenBalance },
    } = useEthereumAccount();

    return {
      balance,
      kokoTokenBalance,
      isRetrievingBalance,
      isRetrievingKokoTokenBalance,
    };
  },
};
</script>
