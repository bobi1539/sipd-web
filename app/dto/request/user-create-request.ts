import { INPUT_NAME, INPUT_PASSWORD, INPUT_ROLE_ID, INPUT_EMAIL } from "@/app/constant/general";
import { getNumberFormData, getStringFormData } from "@/app/util/helper";

export interface UserCreateRequest {
    name: string;
    username: string;
    password: string;
    roleId: number;
}

export const buildUserCreateRequest = (formData: FormData): UserCreateRequest => {
    return {
        name: getStringFormData(formData, INPUT_NAME),
        username: getStringFormData(formData, INPUT_EMAIL),
        password: getStringFormData(formData, INPUT_PASSWORD),
        roleId: getNumberFormData(formData, INPUT_ROLE_ID),
    };
};
