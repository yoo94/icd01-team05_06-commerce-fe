import { http, HttpRequestHandler, Path } from 'msw';

function createClient(baseUrl: string | undefined): typeof http {
  const isExternalUrl = (url: string) => url.match(/^(https|http)/g) !== null;

  const getMockApiUrl = (path: Path) => {
    if (typeof path !== 'string' || isExternalUrl(path)) return path;
    return `${baseUrl}${path}`;
  };

  const createClientHandler = (method: HttpRequestHandler): HttpRequestHandler => {
    return (path, ...args) => method(getMockApiUrl(path), ...args);
  };

  return {
    all: createClientHandler(http.all),
    head: createClientHandler(http.head),
    get: createClientHandler(http.get),
    post: createClientHandler(http.post),
    put: createClientHandler(http.put),
    delete: createClientHandler(http.delete),
    patch: createClientHandler(http.patch),
    options: createClientHandler(http.options),
  };
}

export const authClient = createClient(process.env.NEXT_PUBLIC_AUTH_API_URL);

export const productClient = createClient(process.env.NEXT_PUBLIC_PRODUCT_API_URL);

export const orderClient = createClient(process.env.NEXT_PUBLIC_ORDER_API_URL);
