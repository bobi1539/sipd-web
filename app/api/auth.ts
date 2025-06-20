"use client";

import { BE_AUTH } from "../constant/endpoint-be";
import { COOKIE_REFRESH_TOKEN } from "../constant/general";
import { LoginRequest } from "../dto/request/login-request";
import { LoginRefreshTokenRequest } from "../dto/response/login-refresh-token-request";
import { LoginResponse } from "../dto/response/login-response";
import { getCookie } from "../util/cookie";
import { createHeadersWithoutSession, handleResponse, makePostRequest } from "./helper";

export const apiLogin = async (request: LoginRequest): Promise<LoginResponse> => {
    const LOGIN = BE_AUTH + "/login";
    const headers = await createHeadersWithoutSession();
    const response = await makePostRequest(LOGIN, headers, request);
    return handleResponse(response);
};

export const apiLoginRefreshToken = async (): Promise<LoginResponse> => {
    const REFRESH_TOKEN = BE_AUTH + "/refresh-token";
    const headers = await createHeadersWithoutSession();
    const request = await getLoginRefreshTokenRequest();
    const response = await makePostRequest(REFRESH_TOKEN, headers, request);
    return handleResponse(response);
};

const getLoginRefreshTokenRequest = async (): Promise<LoginRefreshTokenRequest> => {
    return {
        refreshToken: getCookie(COOKIE_REFRESH_TOKEN),
    };
};
