import { INPUT_NAME, INPUT_ROLE_ID, INPUT_EMAIL } from "@/app/constant/general";
import { getNumberFormData, getStringFormData } from "@/app/util/helper";

export interface UserUpdateRequest {
    name: string;
    username: string;
    roleId: number;
}

export const buildUserUpdateRequest = (formData: FormData): UserUpdateRequest => {
    return {
        name: getStringFormData(formData, INPUT_NAME),
        username: getStringFormData(formData, INPUT_EMAIL),
        roleId: getNumberFormData(formData, INPUT_ROLE_ID),
    };
};
