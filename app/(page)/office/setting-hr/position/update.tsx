"use client";

import { apiPositionFindById, apiPositionUpdate } from "@/app/api/position";
import { buildPositionRequest } from "@/app/dto/request/position-request";
import { PositionResponse } from "@/app/dto/response/position-response";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { useEffect, useState } from "react";
import PositionCreateOrUpdate from "./create-or-update";

interface PositionUpdateProps {
    id: number;
    closeModal: () => void;
    fetchApiPositionFindAllPagination: () => Promise<void>;
}

export default function PositionUpdate(props: Readonly<PositionUpdateProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [position, setPosition] = useState<PositionResponse>();

    useEffect(() => {
        apiPositionFindById(props.id).then((response) => setPosition(response));
    }, [props.id]);

    const submitUpdatePosition = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildPositionRequest(formData);
            await apiPositionUpdate(props.id, request);
            await showSuccessDialog();
            props.closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            await props.fetchApiPositionFindAllPagination();
            setIsLoading(false);
        }
    };

    return <PositionCreateOrUpdate isLoading={isLoading} submit={submitUpdatePosition} closeModal={props.closeModal} title="Ubah Jabatan" position={position} />;
}
