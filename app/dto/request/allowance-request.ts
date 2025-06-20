import { INPUT_ALLOWANCE_AMOUNT, INPUT_ALLOWANCE_TYPE_ID, INPUT_POSITION_ID } from "@/app/constant/general";
import { getNumberFormData } from "@/app/util/helper";

export interface AllowanceRequest {
    positionId: number;
    allowanceTypeId: number;
    allowanceAmount: number;
}

export const buildAllowanceRequest = (formData: FormData): AllowanceRequest => {
    return {
        positionId: getNumberFormData(formData, INPUT_POSITION_ID),
        allowanceTypeId: getNumberFormData(formData, INPUT_ALLOWANCE_TYPE_ID),
        allowanceAmount: getNumberFormData(formData, INPUT_ALLOWANCE_AMOUNT),
    };
};
