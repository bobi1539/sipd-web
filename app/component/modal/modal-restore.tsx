import ModalConfirm from "./modal-confirm";

interface ModalRestoreProps {
    isLoading: boolean;
    handleYes: () => void;
    handleCancel: () => void;
}

export default function ModalRestore(props: Readonly<ModalRestoreProps>) {
    return <ModalConfirm isLoading={props.isLoading} handleYes={props.handleYes} handleCancel={props.handleCancel} text1="Apakah anda yakin mengembalikan data ini?" text1Size="text-base md:text-lg" textYesButton="Ya, restore!" />;
}
