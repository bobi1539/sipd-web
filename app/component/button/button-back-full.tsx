import Link from "next/link";
import ButtonIcon from "./button-icon";

interface ButtonBackFullProps {
    href: string;
}

export default function ButtonBackFull(props: Readonly<ButtonBackFullProps>) {
    return (
        <Link href={props.href} className="w-auto">
            <ButtonIcon type="button" icon="fa-solid fa-arrow-left" text="Kembali" className="w-full md:w-auto" color="bg-gray-500 hover:bg-gray-400" />
        </Link>
    );
}
