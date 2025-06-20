import { INPUT_NAME } from "@/app/constant/general";
import { getStringFormData } from "@/app/util/helper";

export interface PositionRequest {
    name: string;
}

export const buildPositionRequest = (formData: FormData): PositionRequest => {
    return {
        name: getStringFormData(formData, INPUT_NAME),
    };
};
