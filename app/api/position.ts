"use client";

import { BE_POSITION } from "../constant/endpoint-be";
import { Pagination } from "../dto/dto/pagination";
import { Search } from "../dto/dto/search";
import { PositionRequest } from "../dto/request/position-request";
import { PaginationResponse } from "../dto/response/pagination-response";
import { PositionResponse } from "../dto/response/position-response";
import { buildUrlFindAll, createHeadersWithSession, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";

export const apiPositionFindAllPagination = async (search: Search, pagination: Pagination): Promise<PaginationResponse<PositionResponse>> => {
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(buildUrlFindAll(BE_POSITION, search, pagination), headers);
    return await handleResponse(response);
};

export const apiPositionFindAll = async (search: Search): Promise<PositionResponse[]> => {
    const url = BE_POSITION + "/all";
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(buildUrlFindAll(url, search), headers);
    return await handleResponse(response);
};

export const apiPositionFindById = async (id: number): Promise<PositionResponse> => {
    const url = BE_POSITION + "/id/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiPositionCreate = async (request: PositionRequest): Promise<PositionResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePostRequest(BE_POSITION, headers, request);
    return await handleResponse(response);
};

export const apiPositionUpdate = async (id: number, request: PositionRequest): Promise<PositionResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePutRequest(id, BE_POSITION, headers, request);
    return await handleResponse(response);
};

export const apiPositionDelete = async (id: number): Promise<PositionResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makeDeleteRequest(id, BE_POSITION, headers);
    return await handleResponse(response);
};
