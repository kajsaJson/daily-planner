import type { IncomingMessage } from 'node:http';

export const parseBody = async (request: IncomingMessage): Promise<any> => {
  let json: string = '';

  for await (const chunk of request) {
    json += chunk;
  }

  const data = JSON.parse(json);

  const { method = '', url } = request;

  console.count(`👇 Body (${method.toUpperCase()} ${url}) 👇`);
  console.dir(data, {
    compact: false,
    depth: null,
  });

  return data;
};
