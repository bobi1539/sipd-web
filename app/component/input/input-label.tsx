interface InputLabelProps {
    value?: string | readonly string[] | number;
    label: string;
    name: string;
    type: string;
    placeHolder?: string;
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
}

export default function InputLabel(props: Readonly<InputLabelProps>) {
    return (
        <div className={props.className}>
            <label htmlFor={props.name} className="block mb-1 text-sm font-medium text-gray-900 capitalize">
                {props.label} {props.required ? <span className="text-red-500">*</span> : ""}
            </label>
            <input value={props.value} onChange={props.onChange} type={props.type} id={props.name} name={props.name} placeholder={props.placeHolder} autoComplete={"on"} required={props.required} disabled={props.disabled} className={`${props.type === "date" ? "py-[9px]" : ""} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-inset focus:border-white focus:ring-2 focus:ring-primary-700 block w-full p-2.5 outline-none`} />
        </div>
    );
}
