interface ButtonIconProps {
    icon: string;
    text: string;
    className?: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    color?: string;
}

export default function ButtonIcon(props: Readonly<ButtonIconProps>) {
    return (
        <button onClick={props.onClick} type={props.type} className={`${props.className} ${props.color ?? "bg-primary-700 hover:bg-primary-600"} text-sm px-4 py-2.5 flex items-center justify-center gap-2 text-white font-medium rounded-lg`}>
            <i className={props.icon}></i>
            <span>{props.text}</span>
        </button>
    );
}
