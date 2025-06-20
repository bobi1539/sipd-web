"use client";

import { apiAllowanceFindById, apiAllowanceUpdate } from "@/app/api/allowance";
import { buildAllowanceRequest } from "@/app/dto/request/allowance-request";
import { AllowanceResponse } from "@/app/dto/response/allowance-response";
import { PositionResponse } from "@/app/dto/response/position-response";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { useEffect, useState } from "react";
import AllowanceCreateOrUpdate from "./create-or-update";

interface AllowanceUpdateProps {
    id: number;
    closeModal: () => void;
    fetchApiAllowanceFindAllPagination: () => Promise<void>;
    position?: PositionResponse;
}

export default function AllowanceUpdate(props: Readonly<AllowanceUpdateProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allowance, setAllowance] = useState<AllowanceResponse>();

    useEffect(() => {
        apiAllowanceFindById(props.id).then((response) => setAllowance(response));
    }, [props.id]);

    const submitUpdateAllowance = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildAllowanceRequest(formData);
            await apiAllowanceUpdate(props.id, request);
            await showSuccessDialog();
            props.closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            await props.fetchApiAllowanceFindAllPagination();
            setIsLoading(false);
        }
    };

    return <AllowanceCreateOrUpdate isLoading={isLoading} submit={submitUpdateAllowance} closeModal={props.closeModal} title="Ubah Tunjangan" position={props.position} allowance={allowance} />;
}
