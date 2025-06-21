import { ICON_RESTORE, TEXT_COLOR_RESTORE, TEXT_RESTORE } from "@/app/constant/general";
import CustomDropdownItem from "./custom-dropdown-item";

interface DropdownRestoreProps {
    onClick: () => void;
}

export default function DropdownRestore(props: Readonly<DropdownRestoreProps>) {
    return <CustomDropdownItem onClick={props.onClick} className={TEXT_COLOR_RESTORE} icon={ICON_RESTORE} text={TEXT_RESTORE} />;
}
