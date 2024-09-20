import ky from 'ky';

const mswApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
  timeout: 10000,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
});

export default mswApi;
