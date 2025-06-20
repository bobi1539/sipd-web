import Swal, { SweetAlertResult } from "sweetalert2";
import { capitalize } from "./helper";

export const showConfirmDialog = async (title: string): Promise<SweetAlertResult<null>> => {
    return await Swal.fire({
        title: title,
        icon: "warning",
        iconColor: "#15803d",
        showCancelButton: true,
        confirmButtonColor: "#15803d",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes",
    });
};

export const showSuccessDialog = async (): Promise<void> => {
    await Swal.fire({
        title: "Sukses",
        icon: "success",
        confirmButtonColor: "#15803d",
        customClass: {
            popup: "custom-swal",
        },
    });
};

export const showErrorDialog = async (text: string): Promise<void> => {
    await Swal.fire({
        text: capitalize(text),
        icon: "error",
        iconColor: "#ef4444",
        confirmButtonColor: "#15803d",
    });
};

export const showConfirmDeleteDialog = async (): Promise<SweetAlertResult<null>> => {
    return await showConfirmDialog("Are you sure to delete ?");
};

export const showConfirmRestoreDialog = async (): Promise<SweetAlertResult<null>> => {
    return await showConfirmDialog("Are you sure to restore ?");
};
