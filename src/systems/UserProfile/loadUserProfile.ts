import { API_ROUTE_USERPROFILE } from 'backend/constants/API_ROUTES.ts';
import { API_ORIGIN } from 'src/constants/API_ORIGIN.ts';
import type { ClientMessage } from 'src/types/ClientMessage.d.ts';
import type { JsonWebToken } from 'src/types/JsonWebToken.d.ts';
import type { ServerMessage } from 'src/types/ServerMessage.d.ts';
import type { UserProfile } from 'src/types/UserProfile.d.ts';

export const loadUserProfile = async (jsonWebToken: JsonWebToken): Promise<UserProfile> => {
  const clientMessage = {
    action: 'read',
    jsonWebToken,
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

  const serverMessage = (await response.json()) as ServerMessage;

  const { status } = serverMessage;

  if (status !== 'ok') throw new Error(status);

  const { data: userProfile } = serverMessage;

  return userProfile;
};
