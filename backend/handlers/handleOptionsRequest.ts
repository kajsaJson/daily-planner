import type { ServerResponse } from 'node:http';

export const handleOptionsRequest = (response: ServerResponse): ServerResponse => {
  return response
    .writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    })
    .end();
};
