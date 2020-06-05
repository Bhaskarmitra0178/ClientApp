import { Asset } from 'expo-asset';

export const initialiseImages = async (imagePath: any) => {
    const image = await Asset.fromModule(imagePath).uri
    return image;
}