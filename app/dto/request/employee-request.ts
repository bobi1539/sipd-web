import { INPUT_ADDRESS, INPUT_BANK_ACCOUNT_NAME, INPUT_BANK_ACCOUNT_NUMBER, INPUT_BIRTH_DATE, INPUT_EMAIL, INPUT_JOIN_DATE, INPUT_NAME, INPUT_NPWP, INPUT_PHONE_NUMBER, INPUT_POSITION_ID, INPUT_TOTAL_CHILD, INPUT_WORK_STATUS } from "@/app/constant/general";
import { getNumberFormData, getStringFormData } from "@/app/util/helper";

export interface EmployeeRequest {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    workStatus: string;
    bankAccountNumber: string;
    bankAccountName: string;
    npwp: string;
    birthDate: string;
    joinDate: string;
    isMarried: boolean;
    totalChild: number;
    positionId: number;
}

export const buildEmployeeRequest = (formData: FormData): EmployeeRequest => {
    return {
        name: getStringFormData(formData, INPUT_NAME),
        phoneNumber: getStringFormData(formData, INPUT_PHONE_NUMBER),
        email: getStringFormData(formData, INPUT_EMAIL),
        address: getStringFormData(formData, INPUT_ADDRESS),
        workStatus: getStringFormData(formData, INPUT_WORK_STATUS),
        bankAccountNumber: getStringFormData(formData, INPUT_BANK_ACCOUNT_NUMBER),
        bankAccountName: getStringFormData(formData, INPUT_BANK_ACCOUNT_NAME),
        npwp: getStringFormData(formData, INPUT_NPWP),
        birthDate: getStringFormData(formData, INPUT_BIRTH_DATE),
        joinDate: getStringFormData(formData, INPUT_JOIN_DATE),
        isMarried: false,
        totalChild: getNumberFormData(formData, INPUT_TOTAL_CHILD),
        positionId: getNumberFormData(formData, INPUT_POSITION_ID),
    };
};
