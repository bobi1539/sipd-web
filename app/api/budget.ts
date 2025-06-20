"use client";
import { BE_BUDGET } from "../constant/endpoint-be";
import { Search } from "../dto/dto/search";
import { BudgetRequest } from "../dto/request/budget-request";
import { BudgetResponse } from "../dto/response/budget-response";
import { PaginationResponse } from "../dto/response/pagination-response";
import { createHeadersWithSession, getUrlFindAll, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest, makePutRequestWithoutId } from "./helper";

export const apiFindAllPaginationBudget = async (search: Search): Promise<PaginationResponse<BudgetResponse>> => {
    const url = getUrlFindAll(BE_BUDGET, search);
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiFindByIdBudget = async (id: number): Promise<BudgetResponse> => {
    const url = BE_BUDGET + "/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiCreateBudget = async (request: BudgetRequest): Promise<BudgetResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePostRequest(BE_BUDGET, headers, request);
    return await handleResponse(response);
};

export const apiUpdateBudget = async (id: number, request: BudgetRequest): Promise<BudgetResponse> => {
    const url = BE_BUDGET + "/" + id;
    const headers = await createHeadersWithSession();
    const response = await makePutRequest(url, headers, request);
    return await handleResponse(response);
};

export const apiDeleteBudget = async (id: number): Promise<BudgetResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makeDeleteRequest(id, BE_BUDGET, headers);
    return await handleResponse(response);
};

export const apiRestoreBudget = async (id: number): Promise<BudgetResponse> => {
    const url = BE_BUDGET + "/restore/" + id;
    const headers = await createHeadersWithSession();
    const response = await makePutRequestWithoutId(url, headers, null);
    return await handleResponse(response);
};
