import { PORT } from 'backend/constants/PORT.ts';
import { handleIncomingRequest } from 'backend/handlers/handleIncomingRequest.ts';
import { createServer } from 'node:http';

console.clear();

export const server = createServer(handleIncomingRequest);

server.on('listening', (): void => {
  console.log(`Server listening on port ${PORT}`);
});

server.listen(PORT);
