interface ButtonLoadingProps {
    icon?: string;
    text?: string;
    className?: string;
    padding?: string;
}

export default function ButtonLoading(props: Readonly<ButtonLoadingProps>) {
    return (
        <button type="button" disabled className="relative text-primary-700 bg-primary-700 text-sm px-4 py-2.5 flex items-center justify-center font-medium rounded-lg">
            <div className="absolute w-5 h-5 border-2 border-t-2 border-gray-200 rounded-full animate-spin border-t-primary-700" />
            <i className={props.icon} />
            <span className={props.icon ? "ml-2" : ""}>{props.text}</span>
        </button>
    );
}
