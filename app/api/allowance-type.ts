"use client";

import { BE_ALLOWANCE_TYPE } from "../constant/endpoint-be";
import { Pagination } from "../dto/dto/pagination";
import { Search } from "../dto/dto/search";
import { AllowanceTypeRequest } from "../dto/request/allowance-type-request";
import { AllowanceTypeResponse } from "../dto/response/allowance-type-response";
import { PaginationResponse } from "../dto/response/pagination-response";
import { buildUrlFindAll, createHeadersWithSession, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequestWithId } from "./helper";

export const apiAllowanceTypeFindAllPagination = async (search: Search, pagination: Pagination): Promise<PaginationResponse<AllowanceTypeResponse>> => {
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(buildUrlFindAll(BE_ALLOWANCE_TYPE, search, pagination), headers);
    return await handleResponse(response);
};

export const apiAllowanceTypeFindAll = async (search: Search): Promise<AllowanceTypeResponse[]> => {
    const url = BE_ALLOWANCE_TYPE + "/all";
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(buildUrlFindAll(url, search), headers);
    return await handleResponse(response);
};

export const apiAllowanceTypeFindById = async (id: number): Promise<AllowanceTypeResponse> => {
    const url = BE_ALLOWANCE_TYPE + "/id/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiAllowanceTypeCreate = async (request: AllowanceTypeRequest): Promise<AllowanceTypeResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePostRequest(BE_ALLOWANCE_TYPE, headers, request);
    return await handleResponse(response);
};

export const apiAllowanceTypeUpdate = async (id: number, request: AllowanceTypeRequest): Promise<AllowanceTypeResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePutRequestWithId(id, BE_ALLOWANCE_TYPE, headers, request);
    return await handleResponse(response);
};

export const apiAllowanceTypeDelete = async (id: number): Promise<AllowanceTypeResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makeDeleteRequest(id, BE_ALLOWANCE_TYPE, headers);
    return await handleResponse(response);
};
