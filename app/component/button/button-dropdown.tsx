interface ButtonDropdownProps {
    onClick: () => void;
    icon: string;
    text: string;
    textColor?: string;
}

export default function ButtonDropdown(props: Readonly<ButtonDropdownProps>) {
    return (
        <button onClick={props.onClick} type="button" className={`${props.textColor ?? "text-gray-700"} w-full flex items-center gap-2 py-2 px-4 hover:text-white hover:bg-primary-700 transition duration-200`}>
            <div className="w-6 h-6 flex justify-center items-center">
                <i className={props.icon} />
            </div>
            <span>{props.text}</span>
        </button>
    );
}
