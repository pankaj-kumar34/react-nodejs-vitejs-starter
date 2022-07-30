import express from 'express';
import { createServer } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { expressMiddleware } from 'cls-rtracer';
import { createTerminus } from '@godaddy/terminus';
import router from './routes';
import * as middleware from './middlewares';
import { getLogger, closeLogStream } from './utils';

const logger = getLogger('server');

const baseURL = '/';

const onSignal = async () => {
  logger.info('🚀 server is starting cleanup');
};

const onShutdown = async () => {
  logger.info('cleanup finished, 🚀 server is shutting down');
  return closeLogStream();
};

const fireServer = (app, port) => {
  const terminusOption = {
    onSignal,
    onShutdown,
    timeout: 12 * 1000,
    signals: ['SIGINT', 'SIGTERM', 'SIGUSR2'],
  };

  // Listen on provided port, on all network interfaces.
  const server = createTerminus(createServer(app), terminusOption);

  server
    .listen(port, () => {
      logger.info(`🚀 server is listening on port ${port}`);
    })
    .on('error', (error) => {
      logger.error(error.message);
      throw error;
    });
};

const server = express();

server.use(
  expressMiddleware({
    useHeader: true,
    echoHeader: true,
    requestIdFactory: uuidv4,
  }),
);

server.use(baseURL, router);

// logs all incoming requests
server.use(middleware.requestLogger);

// logs all the ougoing response
server.use(middleware.responseLogger);

server.use(middleware.errorHandler);

server.use(middleware.notFoundHandler);

process.on('uncaughtException', async (error) => {
  logger.error('uncaught exception at', { error: error.message, stack: error.stack });
  process.kill(process.pid, 'SIGTERM');
});

process.on('unhandledRejection', async (error) => {
  logger.error(`unhandled rejection at ${error}`);
  process.kill(process.pid, 'SIGTERM');
});

fireServer(createServer(server), '3000');
