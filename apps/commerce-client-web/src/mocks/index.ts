export async function initMsw() {
  if (typeof window === 'undefined') {
    const { server } = await import('./node');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}
