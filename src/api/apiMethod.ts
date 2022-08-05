import apiCall from "./apiCall";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDataApi = () => {
    return apiCall({
        endpoint: "/something",
        method: "get",
    });
};

// TODO: To be removed
