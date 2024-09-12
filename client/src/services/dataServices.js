import { get } from "../utils/request";

export const getDataSensor = async (pageSize, page, searchText, searchedColumn) => {
    const result = await get(`data-sensor?pageSize=${pageSize}&page=${page}&searchText=${searchText}&searchedColumn=${searchedColumn}`);
    return result;
};