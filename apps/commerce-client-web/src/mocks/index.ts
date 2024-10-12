export async function initMsw() {
  if (typeof window === 'undefined') {
    const { server } = await import('./node');
    server.listen();
  }

  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}
