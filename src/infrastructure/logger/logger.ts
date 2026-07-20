/**
 * Logger Package
 * 
 * Structured logging with Pino.
 * Pretty print in development, JSON in production.
 * 
 * How to Use:
 * logger.info("Informational message");
 * logger.error("Error message", errorObject);
 * logger.debug("Debugging details", debugData);
 */

import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
const logLevel = process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info');
const prettyPrint = process.env.LOG_PRETTY === 'true' || isDevelopment;

const loggerOptions: pino.LoggerOptions = {
  level: logLevel,
  ...(prettyPrint && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss.l',
        ignore: 'pid,hostname',
      },
    },
  }),
};

export const logger = pino(loggerOptions);

