import { Option } from "../dto/input-select-option";

export interface BusinessTripOptionsResponse {
    tripTypes: Option[];
    participantTypes: Option[];
    paymentMethods: Option[];
    transportationModes: Option[];
}
