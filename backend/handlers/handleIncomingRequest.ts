import { handleOptionsRequest } from 'backend/handlers/handleOptionsRequest.ts';
import { routeRequest } from 'backend/handlers/routeRequest.ts';
import type { IncomingMessage, ServerResponse } from 'node:http';

export const handleIncomingRequest = async (
  request: IncomingMessage,
  response: ServerResponse,
): Promise<ServerResponse> => {
  console.count(handleIncomingRequest.name);

  const { method } = request;

  return method === 'OPTIONS' //
    ? handleOptionsRequest(response)
    : routeRequest(request, response);
};
