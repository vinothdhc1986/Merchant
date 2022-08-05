import apiCall from './apiCall';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const downloadCsvApi = ({ url }: { url: string }) => {
  return apiCall({
    method: 'get',
    url,
  });
};
