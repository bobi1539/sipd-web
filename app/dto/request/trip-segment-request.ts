export interface TripSegmentRequest {
    sequenceOrder: number;
    departureDate: string;
    transportationMode: string;
    departureCityId: number;
    destinationCityId: number;
}
