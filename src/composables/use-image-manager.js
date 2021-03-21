/**
 * External dependencies.
 */
import { useQuery } from '@cytools/vue-query';

/**
 * Internal dependencies.
 */
import useEthereum from '@/composables/use-ethereum';
import ImageManager from '../../build/contracts/ImageManager.json';

export default function useImageManager() {
    const { web3 } = useEthereum();
    const imageManagerQuery = useQuery(
        'image-manager',
        async () => {
            const netId = await web3.eth.net.getId();

            return new web3.eth.Contract(ImageManager.abi, ImageManager.networks[netId].address);
        },
    );

    return {
        imageManagerQuery,
        imageManager: imageManagerQuery.data,
    };
}
