import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { credentials, Metadata } from '@grpc/grpc-js';

if (process.env.NODE_ENV !== 'production') {
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
}

const getTraceExporter = (): OTLPTraceExporter | undefined => {
  const tempoHost = process.env.TEMPO_HOST;
  const user = process.env.TEMPO_USER || process.env.GRAFANA_CLOUD_USER;
  const token = process.env.GRAFANA_CLOUD_TOKEN;

  if (!tempoHost || !user || !token) {
    console.warn('OpenTelemetry: Tempo not configured, tracing disabled');
    console.warn(`  TEMPO_HOST: ${tempoHost ? 'set' : 'missing'}`);
    console.warn(`  TEMPO_USER: ${user ? 'set' : 'missing'}`);
    console.warn(`  GRAFANA_CLOUD_TOKEN: ${token ? 'set' : 'missing'}`);
    return undefined;
  }

  const basicAuth = Buffer.from(`${user}:${token}`).toString('base64');

  const metadata = new Metadata();
  metadata.set('authorization', `Basic ${basicAuth}`);

  console.log('OpenTelemetry: Tempo gRPC trace exporter configured');
  console.log(`  Endpoint: ${tempoHost}`);
  console.log(`  User ID: ${user}`);

  return new OTLPTraceExporter({
    url: tempoHost,
    credentials: credentials.createSsl(),
    metadata,
  });
};

const traceExporter = getTraceExporter();

export const otelSDK = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: process.env.SERVICE_NAME || 'products',
    [ATTR_SERVICE_VERSION]: process.env.npm_package_version || '1.0.0',
  }),
  traceExporter,
  metricReader: undefined,
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': {
        enabled: false,
      },
      '@opentelemetry/instrumentation-http': {
        ignoreIncomingRequestHook: (req) => {
          const ignorePaths = [
            '/health',
            '/health/liveness',
            '/health/readiness',
            '/metrics',
          ];
          return ignorePaths.some((path) => req.url?.startsWith(path));
        },
      },
    }),
  ],
});

export function initTracing(): void {
  otelSDK.start();

  process.on('SIGTERM', () => {
    otelSDK
      .shutdown()
      .then(() => console.log('Tracing terminated'))
      .catch((error) => console.error('Error terminating tracing', error))
      .finally(() => process.exit(0));
  });
}
