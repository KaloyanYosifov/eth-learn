/**
 * External dependencies.
 */
import { ref, isRef } from 'vue';
import { useQuery } from '@cytools/vue-query';

/**
 * Internal dependencies.
 */
import useImageManager from '@/composables/use-image-manager';

export default function useAccountImages({
    account,
}) {
    if (!account) {
        throw new Error('Please enter an account!');
    }

    account = isRef(account) ? account : ref(account);

    const { imageManager } = useImageManager();
    const accountImagesQuery = useQuery(
        ['image', account, imageManager],
        async acc => {
            if (!imageManager.value || !acc) {
                return null;
            }

            return await imageManager.value.methods.getImagesCountForAccount().call({ from: acc });
        },
    );

    return {
        accountImagesQuery,
    };
}
