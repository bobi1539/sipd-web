import { INPUT_PASSWORD, INPUT_USERNAME } from "@/app/constant/general";
import { getStringFormData } from "@/app/util/helper";

export interface LoginRequest {
    username: string;
    password: string;
}

export const buildLoginRequest = (formData: FormData): LoginRequest => {
    return {
        username: getStringFormData(formData, INPUT_USERNAME),
        password: getStringFormData(formData, INPUT_PASSWORD),
    };
};
