"use client";
import { BE_EMPLOYEE } from "../constant/endpoint-be";
import { Search } from "../dto/dto/search";
import { EmployeeResponse } from "../dto/response/employee-response";
import { PaginationResponse } from "../dto/response/pagination-response";
import { createHeadersWithSession, getUrlFindAll, handleResponse, makeGetRequest } from "./helper";

export const apiFindAllPaginationEmployee = async (search: Search): Promise<PaginationResponse<EmployeeResponse>> => {
    const url = getUrlFindAll(BE_EMPLOYEE, search);
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiFindByIdEmployee = async (id: number): Promise<EmployeeResponse> => {
    const url = BE_EMPLOYEE + "/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};
