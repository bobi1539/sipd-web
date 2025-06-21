"use client";
import { apiRestoreBusinessTrip } from "@/app/api/business-trip";
import ModalRestore from "@/app/component/modal/modal-restore";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { useState } from "react";

interface RestoreBusinessTripProps {
    id: number;
    closeModal: () => void;
    fetchApiFindAllPaginationBusinessTrip: () => Promise<void>;
}

export default function RestoreBusinessTrip(props: Readonly<RestoreBusinessTripProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const restoreBusinessTrip = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await apiRestoreBusinessTrip(props.id);
            await showSuccessDialog();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            props.closeModal();
            await props.fetchApiFindAllPaginationBusinessTrip();
        }
    };

    return <ModalRestore isLoading={isLoading} handleYes={restoreBusinessTrip} handleCancel={props.closeModal} />;
}
