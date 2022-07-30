/*
IBM Confidential OCO Source Materials
5900AMC © Copyright IBM Corp. 2021
The source code for this program is not published or otherwise
divested of its trade secrets, irrespective of what has
been deposited with the U.S. Copyright Office.
*/

import morgan from 'morgan';
import { Request } from 'express';
import { getLogger } from '../utils';

const logger = getLogger('response');

morgan.token('url', (request) => {
  return decodeURIComponent(request.url);
});

//response logger middleware for express
export const responseLogger = morgan(':method :status :url - :response-time ms', {
  stream: {
    write: (message) => {
      // do not log request for kube probes e.g /health and /healthz
      if (!message.includes('/health')) logger.info(message.trim());
    },
  },
});
