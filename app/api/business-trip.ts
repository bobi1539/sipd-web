"use client";
import { BE_BUSINESS_TRIP } from "../constant/endpoint-be";
import { Search } from "../dto/dto/search";
import { BusinessTripRequest } from "../dto/request/business-trip-request";
import { BusinessTripDetailResponse } from "../dto/response/business-trip-detail-response";
import { BusinessTripOptionsResponse } from "../dto/response/business-trip-options-response";
import { BusinessTripSimpleResponse } from "../dto/response/business-trip-simple-response";
import { GetDirectoryResponse } from "../dto/response/get-directory-response";
import { PaginationResponse } from "../dto/response/pagination-response";
import { createHeadersWithSession, getUrlFindAll, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";

export const apiGetOptionsBusinessTrip = async (): Promise<BusinessTripOptionsResponse> => {
    const url = BE_BUSINESS_TRIP + "/options";
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiFindAllPaginationBusinessTrip = async (search: Search): Promise<PaginationResponse<BusinessTripSimpleResponse>> => {
    const url = getUrlFindAll(BE_BUSINESS_TRIP, search);
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiFindByIdBusinessTrip = async (id: number): Promise<BusinessTripDetailResponse> => {
    const url = BE_BUSINESS_TRIP + "/" + id;
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};

export const apiCreateBusinessTrip = async (request: BusinessTripRequest): Promise<BusinessTripDetailResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makePostRequest(BE_BUSINESS_TRIP, headers, request);
    return await handleResponse(response);
};

export const apiUpdateBusinessTrip = async (id: number, request: BusinessTripRequest): Promise<BusinessTripDetailResponse> => {
    const url = BE_BUSINESS_TRIP + "/" + id;
    const headers = await createHeadersWithSession();
    const response = await makePutRequest(url, headers, request);
    return await handleResponse(response);
};

export const apiDeleteBusinessTrip = async (id: number): Promise<BusinessTripDetailResponse> => {
    const headers = await createHeadersWithSession();
    const response = await makeDeleteRequest(id, BE_BUSINESS_TRIP, headers);
    return await handleResponse(response);
};

export const apiRestoreBusinessTrip = async (id: number): Promise<BusinessTripDetailResponse> => {
    const url = BE_BUSINESS_TRIP + "/restore/" + id;
    const headers = await createHeadersWithSession();
    const response = await makePutRequest(url, headers, null);
    return await handleResponse(response);
};

export const apiGetDirectoryBusinessTrip = async (): Promise<GetDirectoryResponse> => {
    const url = BE_BUSINESS_TRIP + "/directory";
    const headers = await createHeadersWithSession();
    const response = await makeGetRequest(url, headers);
    return await handleResponse(response);
};
