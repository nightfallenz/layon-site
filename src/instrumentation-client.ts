// Site estático (export): o Sentry roda só no navegador e só é baixado quando o DSN está preenchido
// (desligado, não pesa nada no celular do cliente). Não coleta nome, IP, cookie nem o que a pessoa digita;
// manda só o erro, a página e o modelo do navegador.
import { SENTRY_DSN } from './data/monitoramento';

if (SENTRY_DSN && typeof window !== 'undefined') {
  import('@sentry/nextjs').then(Sentry => {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: location.hostname.endsWith('layonamakhaparis.com.br') ? 'production' : 'preview',
      dataCollection: { userInfo: false, cookies: false, httpHeaders: false, httpBodies: [], urlQueryParams: false, stackFrameVariables: false },
      tracesSampleRate: 0,
    });
  }).catch(() => {});
}
