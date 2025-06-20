"use client";

import { apiAllowanceTypeFindById, apiAllowanceTypeUpdate } from "@/app/api/allowance-type";
import { AllowanceTypeResponse } from "@/app/dto/response/allowance-type-response";
import { useEffect, useState } from "react";
import AllowanceTypeCreateOrUpdate from "./create-or-update";
import { buildAllowanceTypeRequest } from "@/app/dto/request/allowance-type-request";
import { showSuccessDialog } from "@/app/util/sweet-alert";

interface AllowanceTypeUpdateProps {
    id: number;
    closeModal: () => void;
    fetchApiAllowanceTypeFindAllPagination: () => Promise<void>;
}

export default function AllowanceTypeUpdate(props: Readonly<AllowanceTypeUpdateProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allowanceType, setAllowanceType] = useState<AllowanceTypeResponse>();

    useEffect(() => {
        apiAllowanceTypeFindById(props.id).then((response) => setAllowanceType(response));
    }, [props.id]);

    const submitUpdateAllowanceType = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildAllowanceTypeRequest(formData);
            await apiAllowanceTypeUpdate(props.id, request);
            await showSuccessDialog();
            props.closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            await props.fetchApiAllowanceTypeFindAllPagination();
            setIsLoading(false);
        }
    };

    return <AllowanceTypeCreateOrUpdate isLoading={isLoading} submit={submitUpdateAllowanceType} closeModal={props.closeModal} title="Ubah Jenis Tunjangan" allowanceType={allowanceType} />;
}
