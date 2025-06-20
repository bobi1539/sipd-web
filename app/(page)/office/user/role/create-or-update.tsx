"use client";

import ButtonLoadingSave from "@/app/component/button/button-loading-save";
import ButtonSave from "@/app/component/button/button-save";
import InputLabel from "@/app/component/input/input-label";
import Modal from "@/app/component/modal/modal";
import { INPUT_NAME } from "@/app/constant/general";
import { RoleResponse } from "@/app/dto/response/role-response";
import { useEffect, useState } from "react";

interface RoleCreateOrUpdateProps {
    isLoading: boolean;
    submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    closeModal: () => void;
    title: string;
    role?: RoleResponse;
}

export default function RoleCreateOrUpdate(props: Readonly<RoleCreateOrUpdateProps>) {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (props.role) {
            setName(props.role.name);
        }
    }, [props.role]);

    return (
        <Modal title={props.title} closeModal={props.closeModal} className="max-w-lg">
            <form onSubmit={props.submit}>
                <div className="my-4">
                    <InputLabel value={name} onChange={(e) => setName(e.target.value)} label="Nama Role" name={INPUT_NAME} type="text" placeHolder="Masukkan nama role" required={true} />
                </div>
                <div className="flex justify-end">{props.isLoading ? <ButtonLoadingSave /> : <ButtonSave />}</div>
            </form>
        </Modal>
    );
}
