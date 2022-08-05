export interface API_CALL_STATE {
  isLoading: boolean;
  isSuccess: boolean;
  isFailure: boolean;
  errorCode: number | string;
  data: any;
  errorMessage: string;
}

interface Props {
  closeModal: () => void;
  title: string;
  validationMessages;
  downloadSampleCsvEndpoint: string;
  uploadCsvEndpoint: string;
  downloadCsvAction: ({
    url,
    fileName,
  }: {
    url: string;
    fileName?: string;
  }) => void;
  sourceId: number;
  customFilename?: string;
  isAdmin: boolean;
  baseURL?: string;
  fetchListAfterUploadBulk?: () => void;
}

export default Props;
