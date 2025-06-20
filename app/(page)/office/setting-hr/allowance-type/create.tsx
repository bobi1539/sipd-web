"use client";

import { useState } from "react";
import AllowanceTypeCreateOrUpdate from "./create-or-update";
import { buildAllowanceTypeRequest } from "@/app/dto/request/allowance-type-request";
import { apiAllowanceTypeCreate } from "@/app/api/allowance-type";
import { showSuccessDialog } from "@/app/util/sweet-alert";

interface AllowanceTypeCreateProps {
    closeModal: () => void;
    fetchApiAllowanceTypeFindAllPagination: () => Promise<void>;
}

export default function AllowanceTypeCreate(props: Readonly<AllowanceTypeCreateProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submitCreateAllowanceType = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildAllowanceTypeRequest(formData);
            await apiAllowanceTypeCreate(request);
            await showSuccessDialog();
            props.closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            await props.fetchApiAllowanceTypeFindAllPagination();
            setIsLoading(false);
        }
    };

    return <AllowanceTypeCreateOrUpdate isLoading={isLoading} submit={submitCreateAllowanceType} closeModal={props.closeModal} title="Tambah Jenis Tunjangan" />;
}
