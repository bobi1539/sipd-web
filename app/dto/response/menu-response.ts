import { BaseDomainResponse } from "./base-domain-response";
import { SubMenuResponse } from "./sub-menu-response";

export interface MenuResponse extends BaseDomainResponse {
    id: number;
    name: string;
    route: string;
    icon: string;
    sequence: number;
    subMenus: SubMenuResponse[];
}
