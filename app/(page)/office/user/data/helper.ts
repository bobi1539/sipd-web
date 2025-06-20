import { Option } from "@/app/dto/dto/input-select-option";
import { RoleResponse } from "@/app/dto/response/role-response";

export const getRoleOptions = (roles: RoleResponse[]): Option[] => {
    return roles.map((role) => ({
        value: role.id.toString(),
        label: role.name,
    }));
};
