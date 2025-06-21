interface ButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    color?: string;
    disabled?: boolean;
}

export default function Button(props: Readonly<ButtonProps>) {
    return (
        <button onClick={props.onClick} type={props.type} disabled={props.disabled} className={`${props.className} ${props.color ?? "bg-primary-700 hover:bg-primary-600"} text-sm px-4 py-2.5 flex items-center justify-center text-white font-medium rounded-lg`}>
            <span>{props.text}</span>
        </button>
    );
}
