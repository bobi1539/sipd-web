"use client";

import ButtonLoadingSave from "@/app/component/button/button-loading-save";
import ButtonSave from "@/app/component/button/button-save";
import InputHidden from "@/app/component/input/input-hidden";
import InputLabel from "@/app/component/input/input-label";
import Modal from "@/app/component/modal/modal";
import { INPUT_POSITION_ID, INPUT_SALARY_AMOUNT, INPUT_TOTAL_YEAR } from "@/app/constant/general";
import { BasicSalaryResponse } from "@/app/dto/response/basic-salary-response";
import { PositionResponse } from "@/app/dto/response/position-response";
import { formatNumber, removeNonDigit } from "@/app/util/helper";
import { useEffect, useState } from "react";

interface BasicSalaryCreateOrUpdateProps {
    isLoading: boolean;
    submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    closeModal: () => void;
    title: string;
    position?: PositionResponse;
    basicSalary?: BasicSalaryResponse;
}

export default function BasicSalaryCreateOrUpdate(props: Readonly<BasicSalaryCreateOrUpdateProps>) {
    const [positionId, setPositionId] = useState<number>(0);
    const [totalYear, setTotalYear] = useState<number>(0);
    const [salaryAmount, setSalaryAmount] = useState<number>(0);

    useEffect(() => {
        setPositionId(props.position?.id ?? 0);
        if (props.basicSalary) {
            setTotalYear(props.basicSalary.totalYear);
            setSalaryAmount(props.basicSalary.salaryAmount);
        }
    }, [props.position, props.basicSalary]);

    return (
        <Modal title={`${props.title} ${props.position?.name}`} closeModal={props.closeModal} className="max-w-lg">
            <form onSubmit={props.submit}>
                <div className="mb-4 flex flex-col gap-4">
                    <InputHidden value={positionId} onChange={(e) => setPositionId(Number(e.target.value))} name={INPUT_POSITION_ID} />
                    <InputLabel value={formatNumber(totalYear)} onChange={(e) => setTotalYear(removeNonDigit(e))} label="Jumlah Tahun Kerja" name={INPUT_TOTAL_YEAR} type="text" placeHolder="Masukkan jumlah tahun kerja" isRequired={true} />
                    <InputLabel value={formatNumber(salaryAmount)} onChange={(e) => setSalaryAmount(removeNonDigit(e))} label="Jumlah Gaji Pokok" name={INPUT_SALARY_AMOUNT} type="text" placeHolder="Masukkan jumlah gaji pokok" isRequired={true} />
                </div>
                <div className="flex justify-end">{props.isLoading ? <ButtonLoadingSave /> : <ButtonSave />}</div>
            </form>
        </Modal>
    );
}
