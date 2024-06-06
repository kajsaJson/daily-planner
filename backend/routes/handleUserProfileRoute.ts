import { readDatabase } from 'backend/systems/database/readDatabase.ts';
import { send } from 'backend/systems/send.ts';
import { saveUserProfile } from 'backend/systems/userProfile/saveUserProfile.ts';
import { parseBody } from 'backend/utils/parseBody.ts';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { ClientMessage } from 'src/types/ClientMessage.d.ts';

export const handleUserProfileRoute = async (
  request: IncomingMessage,
  response: ServerResponse,
): Promise<ServerResponse> => {
  console.count(handleUserProfileRoute.name);

  const { method = '' } = request;

  switch (method.toUpperCase()) {
    case 'POST': {
      try {
        const database = await readDatabase();

        const clientMessage = (await parseBody(request)) as ClientMessage;

        const { action } = clientMessage;

        if (action === 'read') {
          const { jsonWebToken } = clientMessage;

          const { email: emailFromRequest } = jsonWebToken;

          if (!(emailFromRequest in database)) {
            return send(response, 500, {
              status: 'email mismatch',
            });
          }

          const userProfileFromDatabase = database[emailFromRequest];

          const { email: emailFromDatabase } = userProfileFromDatabase;

          ///////////////////////////////////////////////////////////////
          // * Does Email From Cookie Match Email From UserProfile? *
          ///////////////////////////////////////////////////////////////
          if (emailFromRequest !== emailFromDatabase) {
            return send(response, 500, {
              status: 'email mismatch',
            });
          }

          const { hash: hashFromRequest } = jsonWebToken;

          const { hash: hashFromDatabase } = userProfileFromDatabase;

          ///////////////////////////////////////////////////////////////
          // * Does Hash From Cookie Match Hash From UserProfile? *
          ///////////////////////////////////////////////////////////////
          if (hashFromRequest !== hashFromDatabase) {
            return send(response, 500, {
              status: 'hash mismatch',
            });
          }

          ///////////////////////////////////////////////////////////////
          // * Send UserProfile *
          ///////////////////////////////////////////////////////////////
          return send(response, 200, {
            status: 'ok',
            data: userProfileFromDatabase,
          });
        } else if (action === 'write') {
          const { userProfile: userProfileFromRequest } = clientMessage;

          const { email: emailFromRequest } = userProfileFromRequest;

          if (!(emailFromRequest in database)) {
            return send(response, 500, {
              status: 'email mismatch',
            });
          }

          const userProfileFromDatabase = database[emailFromRequest];

          const { email: emailFromDatabase } = userProfileFromDatabase;

          ///////////////////////////////////////////////////////////////
          // * Does Email From Cookie Match Email From UserProfile? *
          ///////////////////////////////////////////////////////////////
          if (emailFromRequest !== emailFromDatabase) {
            return send(response, 500, {
              status: 'email mismatch',
            });
          }

          const { hash: hashFromRequest } = userProfileFromRequest;

          const { hash: hashFromDatabase } = userProfileFromDatabase;

          ///////////////////////////////////////////////////////////////
          // * Does Hash From Cookie Match Hash From UserProfile? *
          ///////////////////////////////////////////////////////////////
          if (hashFromRequest !== hashFromDatabase) {
            return send(response, 500, {
              status: 'hash mismatch',
            });
          }

          await saveUserProfile(userProfileFromRequest);

          ///////////////////////////////////////////////////////////////
          // * Send UserProfile *
          ///////////////////////////////////////////////////////////////
          return send(response, 200, {
            status: 'ok',
            data: userProfileFromRequest,
          });
        } else {
          throw new RangeError(`Invalid action: "${action}"`);
        }
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
