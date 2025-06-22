interface TextAreaProps {
    label: string;
    name: string;
    rows?: number;
    currentValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isRequired?: boolean;
}

export default function TextArea(props: Readonly<TextAreaProps>) {
    return (
        <div>
            <label htmlFor={props.name} className="block mb-1 text-sm font-medium text-gray-900">
                {props.label} {props.isRequired ? <span className="text-red-500">*</span> : ""}
            </label>
            <textarea id={props.name} name={props.name} value={props.currentValue} onChange={props.onChange} rows={props.rows} required={props.isRequired} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-white focus:ring-inset focus:ring-2 focus:ring-primary-700 block p-2.5 outline-none" />
        </div>
    );
}
