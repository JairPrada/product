import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { IncomingMessage, ServerResponse } from 'http';
import { CORRELATION_ID_HEADER } from '../../correlation-id';

const getLokiTransport = () => {
  const lokiHost = process.env.LOKI_HOST;
  const lokiUser = process.env.GRAFANA_CLOUD_USER;
  const lokiToken = process.env.GRAFANA_CLOUD_TOKEN;

  if (!lokiHost || !lokiUser || !lokiToken) {
    console.log(
      'Loki not configured: missing LOKI_HOST, GRAFANA_CLOUD_USER, or GRAFANA_CLOUD_TOKEN',
    );
    return undefined;
  }

  console.log(`Loki configured: ${lokiHost} with user ${lokiUser}`);

  return {
    target: 'pino-loki',
    options: {
      host: lokiHost,
      basicAuth: {
        username: lokiUser,
        password: lokiToken,
      },
      labels: {
        app: process.env.SERVICE_NAME || 'products',
        env: process.env.NODE_ENV || 'development',
      },
      batching: true,
      interval: 5,
      silenceErrors: false,
    },
  };
};

const getTransport = () => {
  const lokiTransport = getLokiTransport();
  const isDev = process.env.NODE_ENV !== 'production';

  const consoleTransport = isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: true,
        },
      }
    : {
        target: 'pino/file',
        options: { destination: 1 },
      };

  if (lokiTransport) {
    return {
      targets: [lokiTransport, consoleTransport],
    };
  }

  return isDev ? consoleTransport : undefined;
};

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        transport: getTransport(),
        autoLogging: true,
        quietReqLogger: false,
        customProps: (req: IncomingMessage) => ({
          correlationId: (req.headers[CORRELATION_ID_HEADER] as string) || '',
        }),
        serializers: {
          req: (req: IncomingMessage) => ({
            method: req.method,
            url: req.url,
            correlationId: (req.headers[CORRELATION_ID_HEADER] as string) || '',
          }),
          res: (res: ServerResponse) => ({
            statusCode: res.statusCode,
          }),
        },
        redact: ['req.headers.authorization', 'req.headers.cookie'],
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggingModule {}
