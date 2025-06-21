import Button from "../button/button";
import ButtonLoading from "../button/button-loading";
import Modal from "./modal";

interface ModalConfirmProps {
    isLoading: boolean;
    handleYes: () => void;
    handleCancel: () => void;
    text1?: string;
    text2?: string;
}

export default function ModalConfirm(props: Readonly<ModalConfirmProps>) {
    return (
        <Modal title="" closeModal={props.handleCancel} className="max-w-md">
            <div>
                <div className="flex flex-col items-center">
                    <span className="w-24 h-24 text-green-200" />
                    {props.text1 && <h1 className="font-bold text-xl text-gray-600 mt-4 text-center">{props.text1}</h1>}
                    {props.text2 && <h1 className="text-sm text-gray-500">{props.text2}</h1>}
                </div>
                <div className="mt-6 mb-2 flex justify-center gap-2">
                    {props.isLoading ? <ButtonLoading text="Ya!" /> : <Button text="Ya!" onClick={props.handleYes} />}
                    <Button text="Batal" className="bg-red-500 hover:bg-red-600" onClick={props.handleCancel} />
                </div>
            </div>
        </Modal>
    );
}
