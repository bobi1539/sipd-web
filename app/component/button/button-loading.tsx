interface ButtonLoadingProps {
    text?: string;
    className?: string;
    padding?: string;
}

export default function ButtonLoading(props: Readonly<ButtonLoadingProps>) {
    return (
        <button type="button" disabled className={`${props.className} flex justify-center items-center gap-2 rounded-lg bg-primary-700 ${props.padding ?? "px-4 py-2.5"} text-sm font-semibold text-white shadow-sm hover:bg-primary-600`}>
            <div className="w-5 h-5 border-2 border-t-2 border-gray-200 rounded-full animate-spin border-t-primary-700" />
            {props.text && <span>{props.text}</span>}
        </button>
    );
}
