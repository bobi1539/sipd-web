"use client";

import { apiRoleFindAll } from "@/app/api/role";
import { apiUserCreate } from "@/app/api/user";
import ButtonLoadingSave from "@/app/component/button/button-loading-save";
import ButtonSave from "@/app/component/button/button-save";
import InputLabel from "@/app/component/input/input-label";
import InputSelectLabel from "@/app/component/input/input-select-label";
import Modal from "@/app/component/modal/modal";
import { INPUT_NAME, INPUT_PASSWORD, INPUT_ROLE_ID, INPUT_EMAIL } from "@/app/constant/general";
import { Option } from "@/app/dto/dto/input-select-option";
import { buildUserCreateRequest } from "@/app/dto/request/user-create-request";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { useEffect, useState } from "react";
import { getRoleOptions } from "./helper";

interface UserCreateProps {
    closeModal: () => void;
    fetchApiUserFindAllPagination: () => Promise<void>;
}

export default function UserCreate(props: Readonly<UserCreateProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [roleOptions, setRoleOptions] = useState<Option[]>([]);

    useEffect(() => {
        apiRoleFindAll({ value: "" }).then((response) => setRoleOptions(getRoleOptions(response)));
    }, []);

    const submitCreateUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildUserCreateRequest(formData);
            await apiUserCreate(request);
            await showSuccessDialog();
            props.closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            await props.fetchApiUserFindAllPagination();
            setIsLoading(false);
        }
    };

    return (
        <Modal title="Tambah User" closeModal={props.closeModal} className="max-w-lg">
            <form onSubmit={submitCreateUser}>
                <div className="my-4 flex flex-col gap-4">
                    <InputLabel label="Nama" name={INPUT_NAME} type="text" placeHolder="Masukkan nama" isRequired={true} />
                    <InputLabel label="Username" name={INPUT_EMAIL} type="text" placeHolder="Masukkan username" isRequired={true} />
                    <InputLabel label="Password" name={INPUT_PASSWORD} type="password" placeHolder="••••••••" isRequired={true} />
                    <InputSelectLabel label="Role" name={INPUT_ROLE_ID} options={roleOptions} required />
                </div>
                <div className="flex justify-end">{isLoading ? <ButtonLoadingSave /> : <ButtonSave />}</div>
            </form>
        </Modal>
    );
}
