import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageHelper = {
  async storeObject(key: string, value: Array<string>): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      return false;
    }
  },
  async getObject(key: string): Promise<Array<string>> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      return [];
    }
  },

  async clearAll(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem('images');
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default StorageHelper;
