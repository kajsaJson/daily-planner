import { JSON_WEB_TOKEN_LOCAL_STORAGE_KEY } from 'src/constants/JSON_WEB_TOKEN_LOCAL_STORAGE_KEY.ts';

export const removeJsonWebToken = (): void => {
  localStorage.removeItem(JSON_WEB_TOKEN_LOCAL_STORAGE_KEY);
};
