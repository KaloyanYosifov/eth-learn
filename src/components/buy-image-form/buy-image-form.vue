<template>
  <form class="user" @submit.prevent="onSubmit">
    <div class="text-center">
      <h1 class="h4 text-gray-900 mb-4">Get seller images</h1>
    </div>

    <div class="form-group">
      <form-input name="account" placeholder="Seller account" type="text" v-model:value="currentAccount" />

      <ul v-if="images && images.length">
        <li v-for="image in images" :key="image.id">
          <img :src="image.url" />
        </li>
      </ul>
    </div>

    <div class="form-group">
      <button
          type="submit"
          class="btn btn-primary btn-user btn-block"
      >
        <template v-if="!isLoadingSellerImages && !isLoadingImages">
          Get Seller images
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
import FormInput from '@/components/form-input/form-input';
import { useQuery } from '@cytools/vue-query';
import useImageManager from '@/composables/use-image-manager';
import useAccountImages from '@/composables/use-account-images';

export default {
  name: 'BuyImageForm',

  components: {
    FormInput,
    HalfCircleSpinner,
  },

  setup() {
    const currentAccount = ref('');
    const { imageManager } = useImageManager();
    const onSubmit = () => {

    };
    const { accountImagesQuery: { data: imagesCount, isLoading: isLoadingImages } } = useAccountImages({ account: currentAccount });
    const { data: images, isLoading: isLoadingSellerImages } = useQuery(
        ['seller-images', currentAccount, imagesCount, imageManager],
        async (account, iC) => {
          if (!imageManager.value || !iC) {
            return null;
          }

          const images = [];
          for (let i = 0; i < iC; i++) {
            const imageAddress = await imageManager.value.methods.imagesToAccount(account, i).call();
            images.push(await imageManager.value.methods.images(account, imageAddress).call());
          }

          return images;
        },
        {
          onError: error => console.log(error),
          timesToRetryOnError: 0,
        },
    );

    return {
      images,
      currentAccount,
      onSubmit,
      isLoadingSellerImages,
      isLoadingImages,
    };
  },
};
</script>
