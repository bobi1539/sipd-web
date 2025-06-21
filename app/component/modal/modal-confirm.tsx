import Button from "../button/button";
import ButtonLoading from "../button/button-loading";
import Modal from "./modal";

interface ModalConfirmProps {
    text1?: string;
    text1Size?: string;
    text2?: string;
    textYesButton?: string;
    isLoading: boolean;
    handleYes: () => void;
    handleCancel: () => void;
}

export default function ModalConfirm(props: Readonly<ModalConfirmProps>) {
    return (
        <Modal closeModal={props.handleCancel} className="max-w-md" isLoading={props.isLoading}>
            <div>
                <div className="flex flex-col items-center">
                    <i className="fa-regular fa-circle-question  text-green-700 text-7xl" />
                    <h1 className={`${props.text1Size ?? "text-base md:text-xl"} font-bold text-gray-600 mt-4 text-center`}>{props.text1}</h1>
                    <h1 className="text-xs md:text-sm text-gray-500 text-center">{props.text2}</h1>
                </div>
                <div className="mt-6 mb-2 flex justify-center gap-2">
                    {props.isLoading ? <ButtonLoading text={props.textYesButton} /> : <Button text={props.textYesButton} onClick={props.handleYes} />}
                    <Button disabled={props.isLoading} text="Batal" className="bg-red-700 hover:bg-red-600" onClick={props.handleCancel} />
                </div>
            </div>
        </Modal>
    );
}
