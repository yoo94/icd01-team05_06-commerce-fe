import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

worker.start({
  onUnhandledRequest: 'bypass', // or 'warn' to continue seeing warnings
});
