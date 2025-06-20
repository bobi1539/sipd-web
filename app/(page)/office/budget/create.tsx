"use client";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { useState } from "react";
import CreateOrUpdateBudget from "./create-or-update";
import { buildBudgetRequest } from "@/app/dto/request/budget-request";
import { apiCreateBudget } from "@/app/api/budget";

interface CreateBudgetProps {
    closeModal: () => void;
    fetchApiFindAllPaginationBudget: () => Promise<void>;
}

export default function CreateBudget(props: Readonly<CreateBudgetProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submitCreateBudget = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildBudgetRequest(formData);
            await apiCreateBudget(request);
            await showSuccessDialog();
            await props.fetchApiFindAllPaginationBudget();
            props.closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return <CreateOrUpdateBudget isFormLoading={false} isSaveLoading={isLoading} submit={submitCreateBudget} closeModal={props.closeModal} title="Tambah Data Anggaran" />;
}
