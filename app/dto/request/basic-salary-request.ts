import { INPUT_POSITION_ID, INPUT_SALARY_AMOUNT, INPUT_TOTAL_YEAR } from "@/app/constant/general";
import { getNumberFormData } from "@/app/util/helper";

export interface BasicSalaryRequest {
    salaryAmount: number;
    totalYear: number;
    positionId: number;
}

export const buildBasicSalaryRequest = (formData: FormData): BasicSalaryRequest => {
    return {
        salaryAmount: getNumberFormData(formData, INPUT_SALARY_AMOUNT),
        totalYear: getNumberFormData(formData, INPUT_TOTAL_YEAR),
        positionId: getNumberFormData(formData, INPUT_POSITION_ID),
    };
};
