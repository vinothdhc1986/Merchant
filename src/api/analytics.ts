import apiEndpoints from "../lib/apiEndpoints";
import apiCall from "./apiCall";

export const analyticsApi = (data: {
  merchantId: string;
  isAdmin: boolean;
}): void => {
  return apiCall({
    method: "get",
    endpoint: apiEndpoints.ANALYTICS(data.merchantId, data.isAdmin),
  });
};
