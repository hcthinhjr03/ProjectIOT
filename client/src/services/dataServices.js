import { get } from "../utils/request";

export const getDataSensor = async (pageSize, page, searchText, searchedColumn, sortField, sortOrder) => {
    const result = await get(`data-sensor?pageSize=${pageSize}&page=${page}&searchText=${searchText}&searchedColumn=${searchedColumn}&sortField=${sortField}&sortOrder=${sortOrder}`);
    return result;
};