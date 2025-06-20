import { ICON_SAVE } from "@/app/constant/general";
import ButtonIcon from "./button-icon";

export default function ButtonSave() {
    return <ButtonIcon type="submit" icon={ICON_SAVE} text="Simpan" className="w-auto px-5 py-2.5" />;
}
