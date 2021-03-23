/**
 * External dependencies.
 */
import { isRef, ref } from 'vue';
import { useMutation, useQuery } from '@cytools/vue-query';

/**
 * Internal dependencies.
 */
import useEthereum from '@/composables/use-ethereum';
import useImageManager from '@/composables/use-image-manager';

export default function useAccountImages({
    account,
}) {
    if (!account) {
        throw new Error('Please enter an account!');
    }

    account = isRef(account) ? account : ref(account);

    const { web3 } = useEthereum();
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
    const addImageMutation = useMutation((url, price) => {
        return imageManager.value.methods.addImage(web3.utils.toWei(price.toString(), 'ether'), url).send({ from: account.value });
    });

    return {
        addImageMutation,
        accountImagesQuery,
    };
}
