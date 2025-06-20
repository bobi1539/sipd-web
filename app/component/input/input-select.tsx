"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import { Option } from "@/app/dto/dto/input-select-option";

interface InputSelectProps {
    placeholder?: string;
    name: string;
    options: Option[];
    option?: Option;
    padding?: string;
    required?: boolean;
    onChange?: (option: Option | null) => void;
}

export default function InputSelect(props: Readonly<InputSelectProps>) {
    const [selectedOption, setSelectedOption] = useState<Option | null>();

    useEffect(() => {
        setSelectedOption(props.option);
    }, [props.option]);

    const handleChange = (option: Option | null) => {
        setSelectedOption(option);
        if (props.onChange) {
            props.onChange(option);
        }
    };

    return (
        <Select
            inputId={props.name}
            placeholder={props.placeholder ?? "--Pilih--"}
            name={props.name}
            value={selectedOption}
            onChange={handleChange}
            options={props.options}
            menuPortalTarget={document.body}
            required={props.required}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    textTransform: "capitalize",
                    borderColor: "#d1d5db",
                    borderRadius: "0.5rem",
                    backgroundColor: "#f9fafb",
                    fontSize: "0.875rem",
                    boxShadow: state.isFocused ? "inset 0 0 0 2px #15803d" : "none",
                    "&:hover": {
                        borderColor: "#d1d5db",
                    },
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    textTransform: "capitalize",
                    fontSize: "0.875rem",
                    backgroundColor: state.isSelected ? "#15803d" : "#fff",
                    color: state.isSelected ? "#fff" : "#333",
                    "&:hover": {
                        backgroundColor: state.isSelected ? "#15803d" : "#eee",
                    },
                }),
                input: (baseStyles) => ({
                    ...baseStyles,
                    padding: props.padding,
                }),
                menuPortal: (baseStyles) => ({
                    ...baseStyles,
                    zIndex: 1060,
                }),
            }}
        />
    );
}
