import { API_ROUTE_USERPROFILE } from 'backend/constants/API_ROUTES.ts';
import { API_ORIGIN } from 'src/constants/API_ORIGIN.ts';
import { JSON_WEB_TOKEN_LOCAL_STORAGE_KEY } from 'src/constants/JSON_WEB_TOKEN_LOCAL_STORAGE_KEY.ts';
import type { ClientMessage } from 'src/types/ClientMessage.d.ts';
import type { JsonWebToken } from 'src/types/JsonWebToken.d.ts';
import type { ServerMessage } from 'src/types/ServerMessage.d.ts';
import type { UserProfile } from 'src/types/UserProfile.d.ts';

export const saveUserProfile = async (userProfile: UserProfile): Promise<void> => {
  const clientMessage = {
    action: 'write',
    userProfile,
  } as const satisfies ClientMessage;

  const response = await window.fetch(
    //
    `${API_ORIGIN}${API_ROUTE_USERPROFILE}`,
    {
      method: 'POST',
      body: JSON.stringify(clientMessage, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const serverMessage = await (response.json() as Promise<ServerMessage>);

  const { status } = serverMessage;

  if (status === 'ok') {
    const { data: userProfile } = serverMessage;

    const { email, hash } = userProfile;

    const jsonWebToken = {
      email,
      hash,
    } as const satisfies JsonWebToken;

    localStorage.setItem(JSON_WEB_TOKEN_LOCAL_STORAGE_KEY, JSON.stringify(jsonWebToken));
  } else {
    throw new Error(status);
  }
};
