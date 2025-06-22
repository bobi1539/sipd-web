"use client";
import { useState } from "react";
import CreateOrUpdateBusinessTrip from "../create-or-update";
import { showSuccessDialog } from "@/app/util/sweet-alert";

export default function CreateBusinessTrip() {
    const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);

    const submitCreateBusinessTrip = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsSaveLoading(true);
            e.preventDefault();
            await showSuccessDialog();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaveLoading(false);
        }
    };

    return <CreateOrUpdateBusinessTrip isFormLoading={false} isSaveLoading={isSaveLoading} submit={submitCreateBusinessTrip} title="Pengajuan Perjalanan Dinas" />;
}
