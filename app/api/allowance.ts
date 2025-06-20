"use client"

import { BE_ALLOWANCE } from "../constant/endpoint-be";
import { POSITION_ID_PARAM } from "../constant/general";
import { Pagination } from "../dto/dto/pagination";
import { AllowanceRequest } from "../dto/request/allowance-request";
import { AllowanceResponse } from "../dto/response/allowance-response";
import { PaginationResponse } from "../dto/response/pagination-response";
import { AllowanceSearch } from "../dto/search/allowance-search";
import { buildUrlFindAll, createHeadersWithSession, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";

export const apiAllowanceFindAllPagination = async (search: AllowanceSearch, pagination: Pagination): Promise<PaginationResponse<AllowanceResponse>> => {
    const url = buildAllowanceUrlFindAll(BE_ALLOWANCE, search, pagination);
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiAllowanceFindAll = async (search: AllowanceSearch): Promise<AllowanceResponse[]> => {
    const url = buildAllowanceUrlFindAll(BE_ALLOWANCE + "/all", search);
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiAllowanceFindById = async (id: number): Promise<AllowanceResponse> => {
    const url = BE_ALLOWANCE + "/id/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiAllowanceCreate = async (request: AllowanceRequest): Promise<AllowanceResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePostRequest(BE_ALLOWANCE, headers, request);
    return await handleResponse(response);
};

export const apiAllowanceUpdate = async (id: number, request: AllowanceRequest): Promise<AllowanceResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePutRequest(id, BE_ALLOWANCE, headers, request);
    return await handleResponse(response);
};

export const apiAllowanceDelete = async (id: number): Promise<AllowanceResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makeDeleteRequest(id, BE_ALLOWANCE, headers);
    return await handleResponse(response);
};

const buildAllowanceUrlFindAll = (url: string, search: AllowanceSearch, pagination?: Pagination): string => {
    const newUrl = new URL(buildUrlFindAll(url, search, pagination));
    newUrl.searchParams.append(POSITION_ID_PARAM, search.positionId.toString());
    return newUrl.toString();
};