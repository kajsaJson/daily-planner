import type { IncomingMessage, ServerResponse } from 'node:http';

export const handleInvalidRoute = async (
  _request: IncomingMessage,
  response: ServerResponse,
): Promise<ServerResponse> => {
  response.statusCode = 404;

  return response.end();
};
