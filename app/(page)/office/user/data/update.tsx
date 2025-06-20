"use client";

import { apiRoleFindAll } from "@/app/api/role";
import { apiUserFindById, apiUserUpdate } from "@/app/api/user";
import ButtonLoadingSave from "@/app/component/button/button-loading-save";
import ButtonSave from "@/app/component/button/button-save";
import InputLabel from "@/app/component/input/input-label";
import InputSelectLabel from "@/app/component/input/input-select-label";
import Modal from "@/app/component/modal/modal";
import { INPUT_NAME, INPUT_ROLE_ID, INPUT_EMAIL } from "@/app/constant/general";
import { Option } from "@/app/dto/dto/input-select-option";
import { buildUserUpdateRequest } from "@/app/dto/request/user-update-request";
import { showSuccessDialog } from "@/app/util/sweet-alert";
import { useEffect, useState } from "react";
import { getRoleOptions } from "./helper";
import { RoleResponse } from "@/app/dto/response/role-response";

interface UserUpdateProps {
    id: number;
    closeModal: () => void;
    fetchApiUserFindAllPagination: () => Promise<void>;
}

export default function UserUpdate(props: Readonly<UserUpdateProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [roleOption, setRoleOption] = useState<Option>();
    const [roleOptions, setRoleOptions] = useState<Option[]>([]);

    useEffect(() => {
        apiRoleFindAll({ value: "" }).then((response) => setRoleOptions(getRoleOptions(response)));
        apiUserFindById(props.id).then((response) => {
            setName(response.name);
            setUsername(response.username);
            setRoleOption(getRoleOption(response.role));
        });
    }, [props.id]);

    const getRoleOption = (role: RoleResponse): Option => {
        return {
            value: role.id.toString(),
            label: role.name,
        };
    };

    const submitUpdateUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const request = buildUserUpdateRequest(formData);
            await apiUserUpdate(props.id, request);
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
        <Modal title="Ubah User" closeModal={props.closeModal} className="max-w-lg">
            <form onSubmit={submitUpdateUser}>
                <div className="my-4 flex flex-col gap-4">
                    <InputLabel value={name} onChange={(e) => setName(e.target.value)} label="Nama" name={INPUT_NAME} type="text" placeHolder="Masukkan nama" isRequired={true} />
                    <InputLabel value={username} onChange={(e) => setUsername(e.target.value)} label="Username" name={INPUT_EMAIL} type="text" placeHolder="Masukkan username" isRequired={true} />
                    <InputSelectLabel label="Role" name={INPUT_ROLE_ID} option={roleOption} options={roleOptions} required />
                </div>
                <div className="flex justify-end">{isLoading ? <ButtonLoadingSave /> : <ButtonSave />}</div>
            </form>
        </Modal>
    );
}
