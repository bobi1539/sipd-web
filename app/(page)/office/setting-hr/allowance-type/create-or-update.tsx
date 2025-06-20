"use client";

import ButtonLoadingSave from "@/app/component/button/button-loading-save";
import ButtonSave from "@/app/component/button/button-save";
import InputLabel from "@/app/component/input/input-label";
import Modal from "@/app/component/modal/modal";
import { INPUT_NAME } from "@/app/constant/general";
import { AllowanceTypeResponse } from "@/app/dto/response/allowance-type-response";
import { useEffect, useState } from "react";

interface AllowanceTypeCreateOrUpdateProps {
    isLoading: boolean;
    submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    closeModal: () => void;
    title: string;
    allowanceType?: AllowanceTypeResponse;
}

export default function AllowanceTypeCreateOrUpdate(props: Readonly<AllowanceTypeCreateOrUpdateProps>) {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (props.allowanceType) {
            setName(props.allowanceType.name);
        }
    }, [props.allowanceType]);

    return (
        <Modal title={props.title} closeModal={props.closeModal} className="max-w-lg">
            <form onSubmit={props.submit}>
                <div className="my-4">
                    <InputLabel value={name} onChange={(e) => setName(e.target.value)} label="Jenis Tunjangan" name={INPUT_NAME} type="text" placeHolder="Masukkan janis tunjangan" isRequired={true} />
                </div>
                <div className="flex justify-end">{props.isLoading ? <ButtonLoadingSave /> : <ButtonSave />}</div>
            </form>
        </Modal>
    );
}
