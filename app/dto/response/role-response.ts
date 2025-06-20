import { BaseDomainResponse } from "./base-domain-response";

export interface RoleResponse extends BaseDomainResponse {
    id: number;
    name: string;
}
