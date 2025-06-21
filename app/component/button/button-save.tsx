import { ICON_SAVE } from "@/app/constant/icon";
import ButtonIcon from "./button-icon";

export default function ButtonSave() {
    return <ButtonIcon type="submit" icon={ICON_SAVE} text="Simpan" className="w-auto px-4 py-2.5" />;
}
