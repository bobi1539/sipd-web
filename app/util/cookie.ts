"use client";

import Cookies from "js-cookie";
import { COOKIE_EXPIRED_IN_DAYS, COOKIE_JWT_TOKEN, COOKIE_REFRESH_TOKEN } from "../constant/general";

export function setCookie(name: string, value: string) {
    Cookies.set(name, value, { expires: COOKIE_EXPIRED_IN_DAYS, path: "/" });
}

export function getCookie(name: string): string | undefined {
    return Cookies.get(name);
}

export function removeCookie(name: string) {
    Cookies.remove(name);
}

export function setCookieLogin(jwtToken: string, refreshToken: string): void {
    setCookie(COOKIE_JWT_TOKEN, jwtToken);
    setCookie(COOKIE_REFRESH_TOKEN, refreshToken);
}

export function removeCookieLogin(): void {
    removeCookie(COOKIE_JWT_TOKEN);
    removeCookie(COOKIE_REFRESH_TOKEN);
}
