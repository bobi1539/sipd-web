import { BaseDomainResponse } from "./base-domain-response";
import { RoleResponse } from "./role-response";

export interface UserResponse extends BaseDomainResponse {
    id: number;
    name: string;
    username: string;
    role: RoleResponse;
}
