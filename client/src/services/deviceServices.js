import { get, post } from "../utils/request";

export const postActionHistory = async (options) => {
    const result = await post(`action-history`, options);
    return result;
};

export const getActionHistory = async (pageSize, page, searchText, searchedColumn) => {
    const result = await get(`action-history?pageSize=${pageSize}&page=${page}&searchText=${searchText}&searchedColumn=${searchedColumn}`);
    return result;
}