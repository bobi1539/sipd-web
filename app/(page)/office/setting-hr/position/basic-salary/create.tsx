"use client";

import { PositionResponse } from "@/app/dto/response/position-response";
import { useState } from "react";
import BasicSalaryCreateOrUpdate from "./create-or-update";
import { buildBasicSalaryRequest } from "@/app/dto/request/basic-salary-request";
import { apiBasicSalaryCreate } from "@/app/api/basic-salary";
import { showSuccessDialog } from "@/app/util/sweet-alert";

interface BasicSalaryCreateProps {
    closeModal: () => void;
    fetchApiBasicSalaryFindAllPagination: () => Promise<void>;
    position?: PositionResponse;
}

export default function BasicSalaryCreate(props: Readonly<BasicSalaryCreateProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submitCreateBasicSalary = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildBasicSalaryRequest(formData);
            await apiBasicSalaryCreate(request);
            await showSuccessDialog();
            props.closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            await props.fetchApiBasicSalaryFindAllPagination();
            setIsLoading(false);
        }
    };

    return <BasicSalaryCreateOrUpdate isLoading={isLoading} submit={submitCreateBasicSalary} closeModal={props.closeModal} title="Tambah Gaji Pokok" position={props.position} />;
}
