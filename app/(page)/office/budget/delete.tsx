"use client";

import { apiDeleteBudget } from "@/app/api/budget";
import ModalDelete from "@/app/component/modal/modal-delete";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { useState } from "react";

interface DeleteBudgetProps {
    id: number;
    closeModal: () => void;
    fetchApiFindAllPaginationBudget: () => Promise<void>;
}

export default function DeleteBudget(props: Readonly<DeleteBudgetProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteBudget = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await apiDeleteBudget(props.id);
            await showSuccessDialog();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            props.closeModal();
            await props.fetchApiFindAllPaginationBudget();
        }
    };

    return <ModalDelete isLoading={isLoading} handleYes={deleteBudget} handleCancel={props.closeModal} />;
}
