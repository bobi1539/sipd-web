import { DEFAULT_PAGE_SIZE } from "../constant/general";

export const capitalize = (text: string): string => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getItemNumber = (currentPage: number, index: number): number => {
    return (currentPage - 1) * DEFAULT_PAGE_SIZE + index + 1;
};

export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("id-ID").format(value);
};

export const removeNonDigit = (e: React.ChangeEvent<HTMLInputElement>): number => {
    return Number(e.target.value.replace(/\D/g, ""));
};

export const removeDot = (value: string): string => {
    return value.replaceAll(".", "");
};

export const getStringFormData = (formData: FormData, inputName: string): string => {
    return (formData.get(inputName) as string) ?? "";
};

export const getNumberFormData = (formData: FormData, inputName: string): number => {
    return Number(removeDot(formData.get(inputName) as string));
};
