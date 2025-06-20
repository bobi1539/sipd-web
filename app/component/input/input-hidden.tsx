interface InputHiddenProps {
    value?: string | readonly string[] | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

export default function InputHidden(props: Readonly<InputHiddenProps>) {
    return <input id={props.name} name={props.name} value={props.value} onChange={props.onChange} className="hidden" type="text" />;
}
