import { createHashFrom } from 'backend/systems/createHashFrom.ts';
import { readDatabase } from 'backend/systems/database/readDatabase.ts';
import { send } from 'backend/systems/send.ts';
import { parseBody } from 'backend/utils/parseBody.ts';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { UserCredentials } from 'src/types/UserCredentials.d.ts';

export const handleLoginRoute = async (request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> => {
  console.count(handleLoginRoute.name);

  const { method = '' } = request;

  switch (method.toUpperCase()) {
    case 'POST': {
      try {
        const { email, password } = (await parseBody(request)) as UserCredentials;

        const database = await readDatabase();

        if (!(email in database)) {
          return send(response, 200, {
            status: 'user does not exist',
          });
        }

        const hash = createHashFrom(email, password);

        const userProfile = database[email];

        if (userProfile.hash !== hash) {
          return send(response, 200, {
            status: 'wrong email or password',
          });
        }

        return send(response, 200, {
          status: 'ok',
          data: userProfile,
        });
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
