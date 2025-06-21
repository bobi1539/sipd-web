"use client";
import { apiDeleteBusinessTrip } from "@/app/api/business-trip";
import ModalDelete from "@/app/component/modal/modal-delete";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { useState } from "react";

interface DeleteBusinessTripProps {
    id: number;
    closeModal: () => void;
    fetchApiFindAllPaginationBusinessTrip: () => Promise<void>;
}

export default function DeleteBusinessTrip(props: Readonly<DeleteBusinessTripProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteBusinessTrip = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await apiDeleteBusinessTrip(props.id);
            await showSuccessDialog();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            props.closeModal();
            await props.fetchApiFindAllPaginationBusinessTrip();
        }
    };

    return <ModalDelete isLoading={isLoading} handleYes={deleteBusinessTrip} handleCancel={props.closeModal} />;
}
