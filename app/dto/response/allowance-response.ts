import { AllowanceTypeResponse } from "@/app/dto/response/allowance-type-response";
import { PositionResponse } from "@/app/dto/response/position-response";
import { BaseDomainResponse } from "./base-domain-response";

export interface AllowanceResponse extends BaseDomainResponse {
    id: number;
    position: PositionResponse;
    allowanceType: AllowanceTypeResponse;
    allowanceAmount: number;
}
