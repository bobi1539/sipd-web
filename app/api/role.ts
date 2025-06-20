"use client";

import { BE_ROLE } from "../constant/endpoint-be";
import { Pagination } from "../dto/dto/pagination";
import { Search } from "../dto/dto/search";
import { RoleRequest } from "../dto/request/role-request";
import { PaginationResponse } from "../dto/response/pagination-response";
import { RoleResponse } from "../dto/response/role-response";
import { buildUrlFindAll, createHeadersWithSession, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";

export const apiRoleFindAllPagination = async (search: Search, pagination: Pagination): Promise<PaginationResponse<RoleResponse>> => {
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(buildUrlFindAll(BE_ROLE, search, pagination), headers);
    return await handleResponse(response);
};

export const apiRoleFindAll = async (search: Search): Promise<RoleResponse[]> => {
    const url = BE_ROLE + "/all";
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(buildUrlFindAll(url, search), headers);
    return await handleResponse(response);
};

export const apiRoleFindById = async (id: number): Promise<RoleResponse> => {
    const url = BE_ROLE + "/id/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiRoleCreate = async (request: RoleRequest): Promise<RoleResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePostRequest(BE_ROLE, headers, request);
    return await handleResponse(response);
};

export const apiRoleUpdate = async (id: number, request: RoleRequest): Promise<RoleResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePutRequest(id, BE_ROLE, headers, request);
    return await handleResponse(response);
};

export const apiRoleDelete = async (id: number): Promise<RoleResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makeDeleteRequest(id, BE_ROLE, headers);
    return await handleResponse(response);
};
