import { PositionResponse } from "./position-response";
import { BaseDomainResponse } from "./base-domain-response";

export interface BasicSalaryResponse extends BaseDomainResponse {
    id: number;
    salaryAmount: number;
    totalYear: number;
    position: PositionResponse;
}
