"use client";

import { useState } from "react";
import PositionCreateOrUpdate from "./create-or-update";
import { buildPositionRequest } from "@/app/dto/request/position-request";
import { apiPositionCreate } from "@/app/api/position";
import { showSuccessDialog } from "@/app/util/sweet-alert";

interface PositionCreateProps {
    closeModal: () => void;
    fetchApiPositionFindAllPagination: () => Promise<void>;
}

export default function PositionCreate(props: Readonly<PositionCreateProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submitCreatePosition = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildPositionRequest(formData);
            await apiPositionCreate(request);
            await showSuccessDialog();
            props.closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            await props.fetchApiPositionFindAllPagination();
            setIsLoading(false);
        }
    };

    return <PositionCreateOrUpdate isLoading={isLoading} submit={submitCreatePosition} closeModal={props.closeModal} title="Tambah Jabatan" />;
}
