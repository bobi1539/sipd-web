"use client";

import { BE_EMPLOYEE } from "../constant/endpoint-be";
import { Pagination } from "../dto/dto/pagination";
import { Search } from "../dto/dto/search";
import { EmployeeRequest } from "../dto/request/employee-request";
import { EmployeeResponse } from "../dto/response/employee-response";
import { PaginationResponse } from "../dto/response/pagination-response";
import { buildUrlFindAll, createHeadersWithSession, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequestWithId } from "./helper";

export const apiEmployeeFindAllPagination = async (search: Search, pagination: Pagination): Promise<PaginationResponse<EmployeeResponse>> => {
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(buildUrlFindAll(BE_EMPLOYEE, search, pagination), headers);
    return await handleResponse(response);
};

export const apiEmployeeFindAll = async (search: Search): Promise<EmployeeResponse[]> => {
    const url = BE_EMPLOYEE + "/all";
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(buildUrlFindAll(url, search), headers);
    return await handleResponse(response);
};

export const apiEmployeeFindById = async (id: number): Promise<EmployeeResponse> => {
    const url = BE_EMPLOYEE + "/id/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiEmployeeCreate = async (request: EmployeeRequest): Promise<EmployeeResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePostRequest(BE_EMPLOYEE, headers, request);
    return await handleResponse(response);
};

export const apiEmployeeUpdate = async (id: number, request: EmployeeRequest): Promise<EmployeeResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePutRequestWithId(id, BE_EMPLOYEE, headers, request);
    return await handleResponse(response);
};

export const apiEmployeeDelete = async (id: number): Promise<EmployeeResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makeDeleteRequest(id, BE_EMPLOYEE, headers);
    return await handleResponse(response);
};
