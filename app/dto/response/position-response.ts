import { BaseDomainResponse } from "./base-domain-response";

export interface PositionResponse extends BaseDomainResponse {
    id: number;
    name: string;
}
