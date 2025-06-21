"use client";
import ButtonLoadingSave from "@/app/component/button/button-loading-save";
import ButtonSave from "@/app/component/button/button-save";
import InputLabel from "@/app/component/input/input-label";
import Modal from "@/app/component/modal/modal";
import Spinner from "@/app/component/spinner/spinner";
import { INPUT_NAME, INPUT_PRICE, INPUT_QUANTITY, INPUT_TOTAL } from "@/app/constant/general";
import { BudgetResponse } from "@/app/dto/response/budget-response";
import { formatNumber, removeNonDigit } from "@/app/util/helper";
import { useEffect, useState } from "react";

interface CreateOrUpdateBudgetProps {
    isFormLoading: boolean;
    isSaveLoading: boolean;
    submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    closeModal: () => void;
    title: string;
    budget?: BudgetResponse;
}

export default function CreateOrUpdateBudget(props: Readonly<CreateOrUpdateBudgetProps>) {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        if (props.budget) {
            setName(props.budget.name);
            setPrice(props.budget.price);
            setQuantity(props.budget.quantity);
            setTotal(props.budget.total);
        }
    }, [props.budget]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const priceChange = Number(removeNonDigit(e));
        setPrice(priceChange);
        setTotal(priceChange * quantity);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantityChange = Number(removeNonDigit(e));
        setQuantity(quantityChange);
        setTotal(quantityChange * price);
    };

    return (
        <Modal title={props.title} closeModal={props.closeModal} className="max-w-lg" isLoading={props.isSaveLoading}>
            {props.isFormLoading ? (
                <div className="h-32 flex justify-center items-center">
                    <Spinner />
                </div>
            ) : (
                <form onSubmit={props.submit}>
                    <div className="my-4 grid grid-cols-1 gap-2">
                        <InputLabel value={name} onChange={(e) => setName(e.target.value)} label="Nama Anggaran" name={INPUT_NAME} type="text" required={true} />
                        <InputLabel value={formatNumber(price)} onChange={handlePriceChange} label="Harga Satuan" name={INPUT_PRICE} type="text" required={true} />
                        <InputLabel value={formatNumber(quantity)} onChange={handleQuantityChange} label="Jumlah" name={INPUT_QUANTITY} type="text" required={true} />
                        <InputLabel value={formatNumber(total)} label="Total" name={INPUT_TOTAL} type="text" disabled />
                    </div>
                    <div className="flex justify-end">{props.isSaveLoading ? <ButtonLoadingSave /> : <ButtonSave />}</div>
                </form>
            )}
        </Modal>
    );
}
