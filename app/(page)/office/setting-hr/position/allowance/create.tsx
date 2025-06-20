"use client";

import { apiAllowanceCreate } from "@/app/api/allowance";
import { buildAllowanceRequest } from "@/app/dto/request/allowance-request";
import { PositionResponse } from "@/app/dto/response/position-response";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { useState } from "react";
import AllowanceCreateOrUpdate from "./create-or-update";

interface AllowanceCreateProps {
    closeModal: () => void;
    fetchApiAllowanceFindAllPagination: () => Promise<void>;
    position?: PositionResponse;
}

export default function AllowanceCreate(props: Readonly<AllowanceCreateProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
        const submitCreateBasicSalary = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            try {
                setIsLoading(true);
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const request = buildAllowanceRequest(formData);
                await apiAllowanceCreate(request);
                await showSuccessDialog();
                props.closeModal();
            } catch (error) {
                console.error(error);
            } finally {
                await props.fetchApiAllowanceFindAllPagination();
                setIsLoading(false);
            }
        };
    
        return <AllowanceCreateOrUpdate isLoading={isLoading} submit={submitCreateBasicSalary} closeModal={props.closeModal} title="Tambah Tunjangan" position={props.position} />;
}
