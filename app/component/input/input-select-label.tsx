import { Option } from "@/app/dto/dto/input-select-option";
import InputSelect from "./input-select";

interface InputSelectLabelProps {
    placeholder?: string;
    label: string;
    name: string;
    options: Option[];
    option?: Option;
    required?: boolean;
}

export default function InputSelectLabel(props: Readonly<InputSelectLabelProps>) {
    return (
        <div className="">
            <label htmlFor={props.name} className="block mb-1 text-sm font-medium text-gray-900 capitalize">
                {props.label} {props.required ? <span className="text-red-500">*</span> : ""}
            </label>
            <InputSelect placeholder={props.placeholder} name={props.name} options={props.options} option={props.option} padding="5.5px" required={props.required} />
        </div>
    );
}
