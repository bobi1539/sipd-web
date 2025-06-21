"use client";
import { apiRestoreBudget } from "@/app/api/budget";
import ModalRestore from "@/app/component/modal/modal-restore";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { useState } from "react";

interface RestoreBudgetProps {
    id: number;
    closeModal: () => void;
    fetchApiFindAllPaginationBudget: () => Promise<void>;
}

export default function RestoreBudget(props: Readonly<RestoreBudgetProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const restoreBudget = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await apiRestoreBudget(props.id);
            await showSuccessDialog();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            props.closeModal();
            await props.fetchApiFindAllPaginationBudget();
        }
    };

    return <ModalRestore isLoading={isLoading} handleYes={restoreBudget} handleCancel={props.closeModal} />;
}
