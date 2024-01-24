import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token, userId) => {
  try {
    await Promise.all([
      AsyncStorage.setItem("token", token),
      AsyncStorage.setItem("userId", userId),
    ]);
  } catch (error) {
    console.error("Error saving token to AsyncStorage:", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error getting token from AsyncStorage:", error);
  }
};
export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    return userId;
  } catch (error) {
    console.error("Error getting userId from AsyncStorage:", error);
  }
};
