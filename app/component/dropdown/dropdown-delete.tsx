import { TEXT_COLOR_DELETE, TEXT_DELETE } from "@/app/constant/general";
import CustomDropdownItem from "./custom-dropdown-item";
import { ICON_DELETE } from "@/app/constant/icon";

interface DropdownDeleteProps {
    onClick: () => void;
}

export default function DropdownDelete(props: Readonly<DropdownDeleteProps>) {
    return <CustomDropdownItem onClick={props.onClick} className={TEXT_COLOR_DELETE} icon={ICON_DELETE} text={TEXT_DELETE} />;
}
