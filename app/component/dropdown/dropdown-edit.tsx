import { ICON_EDIT, TEXT_COLOR_EDIT, TEXT_EDIT } from "@/app/constant/general";
import CustomDropdownItem from "./custom-dropdown-item";

interface DropdownEditProps {
    onClick: () => void;
}

export default function DropdownEdit(props: Readonly<DropdownEditProps>) {
    return <CustomDropdownItem onClick={props.onClick} className={TEXT_COLOR_EDIT} icon={ICON_EDIT} text={TEXT_EDIT} />;
}
