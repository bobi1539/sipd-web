"use client";
import { BE_CITY } from "../constant/endpoint-be";
import { Search } from "../dto/dto/search";
import { CityResponse } from "../dto/response/city-response";
import { PaginationResponse } from "../dto/response/pagination-response";
import { createHeadersWithSession, getUrlFindAll, handleResponse, makeGetRequest } from "./helper";

export const apiFindAllPaginationCity = async (search: Search): Promise<PaginationResponse<CityResponse>> => {
    const url = getUrlFindAll(BE_CITY, search);
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiFindByIdCity = async (id: number): Promise<CityResponse> => {
    const url = BE_CITY + "/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};
