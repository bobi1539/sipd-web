import { INPUT_PASSWORD, INPUT_EMAIL } from "@/app/constant/general";
import { getStringFormData } from "@/app/util/helper";

export interface LoginRequest {
    email: string;
    password: string;
}

export const buildLoginRequest = (formData: FormData): LoginRequest => {
    return {
        email: getStringFormData(formData, INPUT_EMAIL),
        password: getStringFormData(formData, INPUT_PASSWORD),
    };
};
