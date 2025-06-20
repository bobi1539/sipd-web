"use client";

import ButtonLoadingSave from "@/app/component/button/button-loading-save";
import ButtonSave from "@/app/component/button/button-save";
import InputLabel from "@/app/component/input/input-label";
import Modal from "@/app/component/modal/modal";
import { INPUT_NAME } from "@/app/constant/general";
import { PositionResponse } from "@/app/dto/response/position-response";
import { useEffect, useState } from "react";

interface PositionCreateOrUpdateProps {
    isLoading: boolean;
    submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    closeModal: () => void;
    title: string;
    position?: PositionResponse;
}

export default function PositionCreateOrUpdate(props: Readonly<PositionCreateOrUpdateProps>) {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (props.position) {
            setName(props.position.name);
        }
    }, [props.position]);

    return (
        <Modal title={props.title} closeModal={props.closeModal} className="max-w-lg">
            <form onSubmit={props.submit}>
                <div className="my-4">
                    <InputLabel value={name} onChange={(e) => setName(e.target.value)} label="Jabatan" name={INPUT_NAME} type="text" placeHolder="Masukkan jabatan" isRequired={true} />
                </div>
                <div className="flex justify-end">{props.isLoading ? <ButtonLoadingSave /> : <ButtonSave />}</div>
            </form>
        </Modal>
    );
}
