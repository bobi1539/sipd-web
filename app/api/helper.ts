"use client";

import { COOKIE_JWT_TOKEN, HTTP_CODE_UNAUTHORIZED, PAGE, PAGE_NUMBER, PAGE_SIZE, SEARCH, SIZE, VALUE } from "../constant/general";
import { SESSION_EXPIRED } from "../constant/message";
import { Pagination } from "../dto/dto/pagination";
import { Search } from "../dto/dto/search";
import { getCookie, removeCookieLogin, setCookieLogin } from "../util/cookie";
import { showErrorDialog } from "../util/sweet-alert";
import { apiLoginRefreshToken } from "./auth";

export const createHeadersWithoutSession = async (): Promise<Headers> => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    return new Headers(headers);
};

export const createHeadersWithSession = async (): Promise<Headers> => {
    const jwtToken = getCookie(COOKIE_JWT_TOKEN);
    const headersObj: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
    };
    return new Headers(headersObj);
};

export const makeGetRequest = async (url: string, headers: Headers): Promise<Response> => {
    const response = await fetch(url, {
        method: "GET",
        headers: headers,
    });
    if (response.status === HTTP_CODE_UNAUTHORIZED) {
        await handleTokenExpired();
        return makeGetRequest(url, await createHeadersWithSession());
    }
    return response;
};

export const makePostRequest = async <T>(url: string, headers: Headers, body: T): Promise<Response> => {
    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: createRequestBody(body),
    });
    if (response.status === HTTP_CODE_UNAUTHORIZED) {
        await handleTokenExpired();
        return makePostRequest(url, await createHeadersWithSession(), body);
    }
    return response;
};

export const makePutRequest = async <T>(url: string, headers: Headers, body: T): Promise<Response> => {
    const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: createRequestBody(body),
    });
    if (response.status === HTTP_CODE_UNAUTHORIZED) {
        await handleTokenExpired();
        return makePutRequest(url, await createHeadersWithSession(), body);
    }
    return response;
};

export const makePutRequestWithId = async <T>(id: number, url: string, headers: Headers, body: T): Promise<Response> => {
    const response = await fetch(url + "/" + id, {
        method: "PUT",
        headers: headers,
        body: createRequestBody(body),
    });
    if (response.status === HTTP_CODE_UNAUTHORIZED) {
        await handleTokenExpired();
        return makePutRequestWithId(id, url, await createHeadersWithSession(), body);
    }
    return response;
};

export const makePutRequestWithoutId = async <T>(url: string, headers: Headers, body: T): Promise<Response> => {
    const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: createRequestBody(body),
    });
    if (response.status === HTTP_CODE_UNAUTHORIZED) {
        await handleTokenExpired();
        return makePutRequestWithoutId(url, await createHeadersWithSession(), body);
    }
    return response;
};

export const makeDeleteRequest = async (id: number, url: string, headers: Headers): Promise<Response> => {
    const response = await fetch(url + "/id/" + id, {
        method: "DELETE",
        headers: headers,
    });
    if (response.status === HTTP_CODE_UNAUTHORIZED) {
        await handleTokenExpired();
        return makeDeleteRequest(id, url, await createHeadersWithSession());
    }
    return response;
};

export const handleResponse = async <T>(response: Response): Promise<T> => {
    const result = await response.json();
    if (!response.ok) {
        showErrorDialog(result.message);
        throw new Error(`Error : ${result.message}`);
    }
    return result.data as T;
};

export const createRequestBody = <T>(body: T): string => {
    return JSON.stringify(body);
};

export const handleTokenExpired = async (): Promise<void> => {
    try {
        const loginResponse = await apiLoginRefreshToken();
        setCookieLogin(loginResponse.jwt, loginResponse.refreshToken);
    } catch (error) {
        console.error(error);
        removeCookieLogin();
        await showErrorDialog(SESSION_EXPIRED);
    }
};

export const buildUrlFindAll = (url: string, search: Search, pagination?: Pagination): string => {
    const urlWithParam = new URL(url);
    if (search?.value) {
        urlWithParam.searchParams.append(SEARCH, search.value);
    }
    if (pagination?.pageNumber) {
        urlWithParam.searchParams.append(PAGE_NUMBER, pagination.pageNumber.toString());
    }
    if (pagination?.pageSize) {
        urlWithParam.searchParams.append(PAGE_SIZE, pagination.pageSize.toString());
    }
    return urlWithParam.toString();
};

export const getUrlFindAll = (endpoint: string, search: Search): string => {
    const url = new URL(endpoint);
    if (search?.value) {
        url.searchParams.append(VALUE, search.value);
    }
    if (search?.page) {
        url.searchParams.append(PAGE, search.page.toString());
    }
    if (search?.size) {
        url.searchParams.append(SIZE, search.size.toString());
    }
    return url.toString();
};
