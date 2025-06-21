import Button from "../button/button";
import ButtonLoading from "../button/button-loading";
import Modal from "./modal";

interface ModalDeleteProps {
    isLoading: boolean;
    handleYes: () => void;
    handleCancel: () => void;
}

export default function ModalDelete(props: Readonly<ModalDeleteProps>) {
    return (
        <Modal closeModal={props.handleCancel} className="max-w-md" isLoading={props.isLoading}>
            <div>
                <div className="flex flex-col items-center">
                    <i className="fa-regular fa-circle-question  text-green-700 text-7xl" />
                    <h1 className="font-bold text-xl text-gray-600 mt-4">Apakah anda yakin menghapus data ini ?</h1>
                    <h1 className="text-sm text-gray-500">Data yang sudah dihapus tidak dapat dikembalikan!</h1>
                </div>
                <div className="mt-6 mb-2 flex justify-center gap-2">
                    {props.isLoading ? <ButtonLoading text="Ya, hapus!" /> : <Button text="Ya, hapus!" onClick={props.handleYes} />}
                    <Button disabled={props.isLoading} text="Batal" className="bg-red-700 hover:bg-red-600" onClick={props.handleCancel} />
                </div>
            </div>
        </Modal>
    );
}
