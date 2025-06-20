"use client";

import { apiAllowanceTypeFindAll } from "@/app/api/allowance-type";
import ButtonLoadingSave from "@/app/component/button/button-loading-save";
import ButtonSave from "@/app/component/button/button-save";
import InputHidden from "@/app/component/input/input-hidden";
import InputLabel from "@/app/component/input/input-label";
import InputSelectLabel from "@/app/component/input/input-select-label";
import Modal from "@/app/component/modal/modal";
import { INPUT_ALLOWANCE_AMOUNT, INPUT_ALLOWANCE_TYPE_ID, INPUT_POSITION_ID } from "@/app/constant/general";
import { Option } from "@/app/dto/dto/input-select-option";
import { AllowanceResponse } from "@/app/dto/response/allowance-response";
import { AllowanceTypeResponse } from "@/app/dto/response/allowance-type-response";
import { PositionResponse } from "@/app/dto/response/position-response";
import { formatNumber, removeNonDigit } from "@/app/util/helper";
import { useEffect, useState } from "react";

interface AllowanceCreateOrUpdateProps {
    isLoading: boolean;
    submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    closeModal: () => void;
    title: string;
    position?: PositionResponse;
    allowance?: AllowanceResponse;
}

export default function AllowanceCreateOrUpdate(props: Readonly<AllowanceCreateOrUpdateProps>) {
    const [positionId, setPositionId] = useState<number>(0);
    const [allowanceTypeOption, setAllowanceTypeOption] = useState<Option>();
    const [allowanceTypeOptions, setAllowanceTypeOptions] = useState<Option[]>([]);
    const [allowanceAmount, setAllowanceAmount] = useState<number>(0);

    useEffect(() => {
        apiAllowanceTypeFindAll({ value: "" }).then((response) => {
            const options: Option[] = response.map((allowanceType) => ({
                value: allowanceType.id.toString(),
                label: allowanceType.name,
            }));
            setAllowanceTypeOptions(options);
        });

        setPositionId(props.position?.id ?? 0);
        if (props.allowance) {
            setAllowanceTypeOption(getAllowanceTypeOption(props.allowance.allowanceType));
            setAllowanceAmount(props.allowance.allowanceAmount);
        }
    }, [props.position, props.allowance]);

    const getAllowanceTypeOption = (allowanceType: AllowanceTypeResponse): Option => {
        return {
            value: allowanceType.id.toString(),
            label: allowanceType.name,
        };
    };

    return (
        <Modal title={`${props.title} ${props.position?.name}`} closeModal={props.closeModal} className="max-w-lg">
            <form onSubmit={props.submit}>
                <div className="mb-4 flex flex-col gap-4">
                    <InputHidden value={positionId} onChange={(e) => setPositionId(Number(e.target.value))} name={INPUT_POSITION_ID} />
                    <InputSelectLabel label="Jenis Tunjangan" name={INPUT_ALLOWANCE_TYPE_ID} option={allowanceTypeOption} options={allowanceTypeOptions} required />
                    <InputLabel value={formatNumber(allowanceAmount)} onChange={(e) => setAllowanceAmount(removeNonDigit(e))} label="Jumlah Tunjangan" name={INPUT_ALLOWANCE_AMOUNT} type="text" placeHolder="Masukkan jumlah tunjangan" isRequired={true} />
                </div>
                <div className="flex justify-end">{props.isLoading ? <ButtonLoadingSave /> : <ButtonSave />}</div>
            </form>
        </Modal>
    );
}
