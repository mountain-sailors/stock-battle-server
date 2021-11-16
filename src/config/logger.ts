import winston from 'winston';
import 'winston-daily-rotate-file';

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [
  new winston.transports.Console({ format: winston.format.colorize({ all: true }) }),
  new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: 'logs',
    filename: `%DATE%_error.log`,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
  new winston.transports.DailyRotateFile({
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    dirname: 'logs',
    filename: `%DATE%.log`,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
];

const logger = winston.createLogger({
  format,
  transports,
});

const myStream = {
  write: (text: string) => {
    logger.info(text);
  },
};

export { myStream, logger };
