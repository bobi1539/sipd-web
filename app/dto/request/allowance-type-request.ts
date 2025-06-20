import { INPUT_NAME } from "@/app/constant/general";
import { getStringFormData } from "@/app/util/helper";

export interface AllowanceTypeRequest {
    name: string;
}

export const buildAllowanceTypeRequest = (formData: FormData): AllowanceTypeRequest => {
    return {
        name: getStringFormData(formData, INPUT_NAME),
    };
};
