"use client"

import { BE_USER } from "../constant/endpoint-be";
import { Pagination } from "../dto/dto/pagination";
import { Search } from "../dto/dto/search";
import { UserCreateRequest } from "../dto/request/user-create-request";
import { UserUpdateRequest } from "../dto/request/user-update-request";
import { PaginationResponse } from "../dto/response/pagination-response";
import { UserResponse } from "../dto/response/user-response";
import { buildUrlFindAll, createHeadersWithSession, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";

export const apiUserFindAllPagination = async (search: Search, pagination: Pagination): Promise<PaginationResponse<UserResponse>> => {
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(buildUrlFindAll(BE_USER, search, pagination), headers);
    return await handleResponse(response);
};

export const apiUserFindAll = async (search: Search): Promise<UserResponse[]> => {
    const url = BE_USER + "/all";
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(buildUrlFindAll(url, search), headers);
    return await handleResponse(response);
};

export const apiUserFindById = async (id: number): Promise<UserResponse> => {
    const url = BE_USER + "/id/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiUserCreate = async (request: UserCreateRequest): Promise<UserResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePostRequest(BE_USER, headers, request);
    return await handleResponse(response);
};

export const apiUserUpdate = async (id: number, request: UserUpdateRequest): Promise<UserResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePutRequest(id, BE_USER, headers, request);
    return await handleResponse(response);
};

export const apiUserDelete = async (id: number): Promise<UserResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makeDeleteRequest(id, BE_USER, headers);
    return await handleResponse(response);
};
