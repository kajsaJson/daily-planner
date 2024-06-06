import { createHashFrom } from 'backend/systems/createHashFrom.ts';
import { readDatabase } from 'backend/systems/database/readDatabase.ts';
import { send } from 'backend/systems/send.ts';
import { saveUserProfile } from 'backend/systems/userProfile/saveUserProfile.ts';
import { parseBody } from 'backend/utils/parseBody.ts';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { UserCredentials } from 'src/types/UserCredentials.d.ts';
import type { UserProfile } from 'src/types/UserProfile.d.ts';

export const handleSignupRoute = async (
  request: IncomingMessage,
  response: ServerResponse,
): Promise<ServerResponse> => {
  console.count(handleSignupRoute.name);

  const { method = '' } = request;

  switch (method.toUpperCase()) {
    case 'POST': {
      try {
        const { email, password } = (await parseBody(request)) as UserCredentials;

        const database = await readDatabase();

        if (email in database) {
          return send(
            //
            response,
            200,
            {
              status: 'user already exists',
            },
          );
        }

        const hash = createHashFrom(email, password);

        const userProfile: UserProfile = {
          email,
          hash,
          preferences: {
            colorTheme: 'dark',
          },
          plannerEntries: [],
        };

        await saveUserProfile(userProfile);

        return send(
          //
          response,
          200,
          {
            status: 'ok',
            data: userProfile,
          },
        );
      } catch (error) {
        console.error(error);

        return send(response, 500, {
          status: 'error',
        });
      }
    }

    default: {
      return send(response, 405, {
        status: 'method not allowed',
      });
    }
  }
};
