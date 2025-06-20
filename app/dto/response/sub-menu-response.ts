import { BaseDomainResponse } from "./base-domain-response";

export interface SubMenuResponse extends BaseDomainResponse {
    id: number;
    name: string;
    route: string;
    sequence: number;
    menuId: number;
}
