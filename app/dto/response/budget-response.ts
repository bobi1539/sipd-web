import { BaseMasterResponse } from "./base-master-response";

export interface BudgetResponse extends BaseMasterResponse {
    id: number;
    name: string;
    price: number;
    quantity: number;
    used: number;
    remaining: number;
    total: number;
}
