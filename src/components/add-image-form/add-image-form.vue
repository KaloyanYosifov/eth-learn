<template>
  <form class="user" @submit.prevent="onSubmit">
    <div class="text-center">
      <h1 class="h4 text-gray-900 mb-4">Amount to deposit!</h1>
    </div>

    <div class="form-group">
      <form-input name="image" placeholder="URL" type="text" v-model:value="url" />
    </div>

    <div class="form-group">
      <number-form-input
          type="number"
          placeholder="amount"
          :max="90"
          :min="0.1"
          v-model:value="price"
      />
    </div>

    <div class="form-group">
      <button
          type="submit"
          class="btn btn-primary btn-user btn-block"
      >
        <template v-if="!isAddingImage">
          Add Image
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
import useAccountImages from '@/composables/use-account-images';
import useEthereumAccount from '@/composables/use-ethereum-account';
import NumberFormInput from '@/components/number-form-input/number-form-input';
import FormInput from '@/components/form-input/form-input';

export default {
  name: 'AddImageForm',

  components: {
    FormInput,
    NumberFormInput,
    HalfCircleSpinner,
  },

  setup() {
    const url = ref('');
    const price = ref(0.1);
    const { account } = useEthereumAccount();
    const {
      addImageMutation: {
        mutate: addImage,
        isLoading: isAddingImage,
      },
    } = useAccountImages({ account });
    const onSubmit = () => {
      if (!url.value) {
        window.alert('Please enter a url!');
        return;
      }

      addImage(url.value, price.value);
    };

    return {
      url,
      price,
      onSubmit,
      isAddingImage,
    };
  },
};
</script>
