import { INPUT_NAME } from "@/app/constant/general";
import { getStringFormData } from "@/app/util/helper";

export interface RoleRequest {
    name: string;
}

export const buildRoleRequest = (formData: FormData): RoleRequest => {
    return {
        name: getStringFormData(formData, INPUT_NAME),
    };
};
