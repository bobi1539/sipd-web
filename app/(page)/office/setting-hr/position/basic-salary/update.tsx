"use client";

import { PositionResponse } from "@/app/dto/response/position-response";
import { useEffect, useState } from "react";
import BasicSalaryCreateOrUpdate from "./create-or-update";
import { apiBasicSalaryFindById, apiBasicSalaryUpdate } from "@/app/api/basic-salary";
import { BasicSalaryResponse } from "@/app/dto/response/basic-salary-response";
import { buildBasicSalaryRequest } from "@/app/dto/request/basic-salary-request";
import { showSuccessDialog } from "@/app/util/sweet-alert";

interface BasicSalaryUpdateProps {
    id: number;
    closeModal: () => void;
    fetchApiBasicSalaryFindAllPagination: () => Promise<void>;
    position?: PositionResponse;
}

export default function BasicSalaryUpdate(props: Readonly<BasicSalaryUpdateProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [basicSalary, setBasicSalary] = useState<BasicSalaryResponse>();

    useEffect(() => {
        apiBasicSalaryFindById(props.id).then((response) => setBasicSalary(response));
    }, [props.id]);

    const submitUpdateBasicSalary = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildBasicSalaryRequest(formData);
            await apiBasicSalaryUpdate(props.id, request);
            await showSuccessDialog();
            props.closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            await props.fetchApiBasicSalaryFindAllPagination();
            setIsLoading(false);
        }
    };

    return <BasicSalaryCreateOrUpdate isLoading={isLoading} submit={submitUpdateBasicSalary} closeModal={props.closeModal} title="Ubah Gaji Pokok" position={props.position} basicSalary={basicSalary} />;
}
