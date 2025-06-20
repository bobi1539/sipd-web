import { INPUT_NAME, INPUT_PRICE, INPUT_QUANTITY } from "@/app/constant/general";
import { getNumberFormData, getStringFormData } from "@/app/util/helper";

export interface BudgetRequest {
    name: string;
    price: number;
    quantity: number;
}

export const buildBudgetRequest = (formData: FormData): BudgetRequest => {
    return {
        name: getStringFormData(formData, INPUT_NAME),
        price: getNumberFormData(formData, INPUT_PRICE),
        quantity: getNumberFormData(formData, INPUT_QUANTITY),
    };
};
