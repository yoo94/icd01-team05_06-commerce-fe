export async function initMsw() {
  if (typeof window === 'undefined') {
    const { server } = await import('./node');
    server.listen({
      onUnhandledRequest: 'bypass',
    });
  }

  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}
