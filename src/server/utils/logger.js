import nconf from 'nconf';
import log4js from 'log4js';
import rtracer from 'cls-rtracer';

const logger = log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%d]%] %[%x{requestId}%] %[[%p]%] %[%c:%] %m',
        tokens: {
          requestId() {
            return rtracer.id() ? `[${rtracer.id()}]` : ``;
          },
        },
      },
    },
  },
  categories: { default: { appenders: ['out'], level: nconf.get('LOG_LEVEL') || 'info' } },
});

export const getLogger = (filename) => logger.getLogger(filename);

export const closeLogStream = async () => {
  log4js.shutdown((error) => {
    if (error !== undefined) {
      throw new Error(`error closing logger stream, ${error.message}`);
    }
  });
};
