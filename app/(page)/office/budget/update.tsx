"use client";
import { useEffect, useState } from "react";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { BudgetResponse } from "@/app/dto/response/budget-response";
import { apiFindByIdBudget, apiUpdateBudget } from "@/app/api/budget";
import { buildBudgetRequest } from "@/app/dto/request/budget-request";
import CreateOrUpdateBudget from "./create-or-update";

interface UpdateBudgetProps {
    id: number;
    closeModal: () => void;
    fetchApiFindAllPaginationBudget: () => Promise<void>;
}

export default function UpdateBudget(props: Readonly<UpdateBudgetProps>) {
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
    const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
    const [budget, setBudget] = useState<BudgetResponse>();

    useEffect(() => {
        setIsFormLoading(true);
        apiFindByIdBudget(props.id)
            .then((response) => setBudget(response))
            .finally(() => setIsFormLoading(false));
    }, [props.id]);

    const submitUpdateBudget = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsSaveLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildBudgetRequest(formData);
            await apiUpdateBudget(props.id, request);
            await showSuccessDialog();
            await props.fetchApiFindAllPaginationBudget();
            props.closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaveLoading(false);
        }
    };

    return <CreateOrUpdateBudget isFormLoading={isFormLoading} isSaveLoading={isSaveLoading} submit={submitUpdateBudget} closeModal={props.closeModal} title="Ubah Data Anggaran" budget={budget} />;
}
