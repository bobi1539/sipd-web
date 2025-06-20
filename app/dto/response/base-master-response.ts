import { BaseDomainResponse } from "./base-domain-response";

export interface BaseMasterResponse extends BaseDomainResponse {
    deleted: boolean;
}
