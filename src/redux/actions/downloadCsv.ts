/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ActionConstants from '../constants';
import { downloadCsvApi } from 'api/downloadCsv';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const downloadCsvAction = ({
  url,
  fileName,
}: {
  url: string;
  fileName?: string;
}) => {
  const payload = {
    serviceMethod: downloadCsvApi.bind(null, { url }),
    actionTypeRequest: ActionConstants.GET_DOWNLOAD_CSV_REQUEST,
    extra: { fileName },
  };
  return { type: ActionConstants.GET_DOWNLOAD_CSV_ACTION, payload };
};
