import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = "access_token"

async function setKey(key: string, value:string):Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

async function getKey(key: string): Promise<string> {
  let result = await SecureStore.getItemAsync(key);
  if (!result) {
    return ""
  }
  return result;
}

async function getAccessToken(): Promise<string> {
    return await getKey(ACCESS_TOKEN_KEY)
}

async function setAccessToken(accessToken: string): Promise<void> {
    await setKey(ACCESS_TOKEN_KEY, accessToken)
}

export default {
    setKey,
    getKey,
    getAccessToken,
    setAccessToken,
}