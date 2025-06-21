import { CityResponse } from "./city-response";

export interface TripSegmentResponse {
    id: number;
    sequenceOrder: number;
    departureDate: string;
    transportationMode: string;
    departure: CityResponse;
    destination: CityResponse;
}
