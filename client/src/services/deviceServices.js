import { post } from "../utils/request";

export const postActionHistory = async (options) => {
    const result = await post(`action-history`, options);
    return result;
};