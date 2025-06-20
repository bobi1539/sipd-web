"use client";

import { BE_BASIC_SALARY } from "../constant/endpoint-be";
import { POSITION_ID_PARAM } from "../constant/general";
import { Pagination } from "../dto/dto/pagination";
import { BasicSalaryRequest } from "../dto/request/basic-salary-request";
import { BasicSalaryResponse } from "../dto/response/basic-salary-response";
import { PaginationResponse } from "../dto/response/pagination-response";
import { BasicSalarySearch } from "../dto/search/basic-salary-search";
import { buildUrlFindAll, createHeadersWithSession, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequestWithId } from "./helper";

export const apiBasicSalaryFindAllPagination = async (search: BasicSalarySearch, pagination: Pagination): Promise<PaginationResponse<BasicSalaryResponse>> => {
    const url = buildBasicSalaryUrlFindAll(BE_BASIC_SALARY, search, pagination);
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiBasicSalaryFindAll = async (search: BasicSalarySearch): Promise<BasicSalaryResponse[]> => {
    const url = buildBasicSalaryUrlFindAll(BE_BASIC_SALARY + "/all", search);
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiBasicSalaryFindById = async (id: number): Promise<BasicSalaryResponse> => {
    const url = BE_BASIC_SALARY + "/id/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiBasicSalaryCreate = async (request: BasicSalaryRequest): Promise<BasicSalaryResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePostRequest(BE_BASIC_SALARY, headers, request);
    return await handleResponse(response);
};

export const apiBasicSalaryUpdate = async (id: number, request: BasicSalaryRequest): Promise<BasicSalaryResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePutRequestWithId(id, BE_BASIC_SALARY, headers, request);
    return await handleResponse(response);
};

export const apiBasicSalaryDelete = async (id: number): Promise<BasicSalaryResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makeDeleteRequest(id, BE_BASIC_SALARY, headers);
    return await handleResponse(response);
};

const buildBasicSalaryUrlFindAll = (url: string, search: BasicSalarySearch, pagination?: Pagination): string => {
    const newUrl = new URL(buildUrlFindAll(url, search, pagination));
    newUrl.searchParams.append(POSITION_ID_PARAM, search.positionId.toString());
    return newUrl.toString();
};
