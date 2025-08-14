import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_CODE_KEY = 'CART_CODE';

export const saveCartCode = async (code: string) => {
  try {
    await AsyncStorage.setItem(CART_CODE_KEY, code);
  } catch (error) {
    console.error('Failed to save cart code', error);
  }
};

export const getCartCode = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(CART_CODE_KEY);
  } catch (error) {
    console.error('Failed to get cart code', error);
    return null;
  }
};

export const clearCartCodeStorage = async () => {
  try {
    await AsyncStorage.removeItem(CART_CODE_KEY);
  } catch (error) {
    console.error('Failed to clear cart code', error);
  }
};
