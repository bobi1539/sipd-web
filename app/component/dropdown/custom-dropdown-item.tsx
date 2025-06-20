import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import ButtonDropdown from "../button/button-dropdown";

interface CustomDropdownItemProps {
    onClick: () => void;
    className: string;
    icon: string;
    text: string;
}

export default function CustomDropdownItem(props: Readonly<CustomDropdownItemProps>) {
    return (
        <DropdownMenuItem className="outline-none">
            <ButtonDropdown onClick={props.onClick} icon={props.icon} text={props.text} textColor={props.className} />
        </DropdownMenuItem>
    );
}
