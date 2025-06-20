import { DropdownMenu, DropdownMenuContent, DropdownMenuPortal, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface CustomDropdownProps {
    children: React.ReactNode;
}

export default function CustomDropdown(props: Readonly<CustomDropdownProps>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger type="button" className="outline-none w-7 h-7 p-4 inline-flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg">
                <i className="fa-solid fa-ellipsis fa-lg" />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent className="w-36 bg-white border border-gray-200 divide-y divide-gray-200 rounded py-1 mr-2 text-sm">{props.children}</DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}
