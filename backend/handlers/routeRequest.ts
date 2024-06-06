import { API_ROUTE_LOGIN, API_ROUTE_SIGNUP, API_ROUTE_USERPROFILE } from 'backend/constants/API_ROUTES.ts';
import { handleInvalidRoute } from 'backend/routes/handleInvalidRoute.ts';
import { handleLoginRoute } from 'backend/routes/handleLoginRoute.ts';
import { handleSignupRoute } from 'backend/routes/handleSignupRoute.ts';
import { handleUserProfileRoute } from 'backend/routes/handleUserProfileRoute.ts';
import type { IncomingMessage, ServerResponse } from 'node:http';

export const routeRequest = async (request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> => {
  const { method, url = '' } = request;

  console.count(`Received ${method} request!`);

  switch (url) {
    case API_ROUTE_LOGIN: {
      return handleLoginRoute(request, response);
    }

    case API_ROUTE_SIGNUP: {
      return handleSignupRoute(request, response);
    }

    case API_ROUTE_USERPROFILE: {
      return handleUserProfileRoute(request, response);
    }

    default: {
      return handleInvalidRoute(request, response);
    }
  }
};
