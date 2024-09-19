import ky from 'ky';

const mswApi = ky.create({
  prefixUrl: 'http://localhost:3000/api/',
  timeout: 10000,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
});

export default mswApi;
