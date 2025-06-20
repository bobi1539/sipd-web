import { BaseDomainResponse } from "./base-domain-response";
import { PositionResponse } from "./position-response";

export interface EmployeeResponse extends BaseDomainResponse {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    workStatus: string;
    bankAccountNumber: string;
    bankAccountName: string;
    npwp: string;
    dateOfBirth: string;
    joinDate: string;
    isMarried: boolean;
    totalChild: number;
    position: PositionResponse;
}
