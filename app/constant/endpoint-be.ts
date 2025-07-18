export const BE_API_URL: string = process.env.NEXT_PUBLIC_BE_API_URL ?? "http://localhost:8080";
export const BE_BASE: string = BE_API_URL + "/api/v1";
export const BE_AUTH: string = BE_BASE + "/auths";
export const BE_ROLE: string = BE_BASE + "/roles";
export const BE_USER: string = BE_BASE + "/users";
export const BE_ALLOWANCE_TYPE: string = BE_BASE + "/allowance-types";
export const BE_POSITION: string = BE_BASE + "/positions";
export const BE_BASIC_SALARY: string = BE_BASE + "/basic-salaries";
export const BE_ALLOWANCE: string = BE_BASE + "/allowances";
export const BE_EMPLOYEE: string = BE_BASE + "/employees";
export const BE_BUDGET: string = BE_BASE + "/budgets";
export const BE_BUSINESS_TRIP: string = BE_BASE + "/business-trips";
export const BE_CITY: string = BE_BASE + "/cities";
