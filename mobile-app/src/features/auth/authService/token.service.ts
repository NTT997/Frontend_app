import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';

const TokenStorageService = {
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async destroyToken(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },
};

export default TokenStorageService;
