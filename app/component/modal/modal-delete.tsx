import ModalConfirm from "./modal-confirm";

interface ModalDeleteProps {
    isLoading: boolean;
    handleYes: () => void;
    handleCancel: () => void;
}

export default function ModalDelete(props: Readonly<ModalDeleteProps>) {
    return <ModalConfirm isLoading={props.isLoading} handleYes={props.handleYes} handleCancel={props.handleCancel} text1="Apakah anda yakin menghapus data ini?" text2="Data yang sudah dihapus tidak dapat dikembalikan!" textYesButton="Ya, hapus!" />;
}
