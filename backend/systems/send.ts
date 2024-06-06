import type { ServerResponse } from 'node:http';
import type { ServerMessage } from 'src/types/ServerMessage.d.ts';

export const send = (response: ServerResponse, statusCode: number, message: ServerMessage): ServerResponse => {
  console.count(send.name);

  return response //
    .writeHead(statusCode, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    })
    .end(JSON.stringify(message, null, 2));
};
