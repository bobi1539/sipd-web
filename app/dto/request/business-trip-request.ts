import { TripAttachmentFileRequest } from "./trip-attachment-file-request";
import { TripParticipantRequest } from "./trip-participant-request";
import { TripSegmentRequest } from "./trip-segment-request";

export interface BusinessTripRequest {
    purpose: string;
    approvalFile: string;
    businessTripType: string;
    participantType: string;
    tripParticipants: TripParticipantRequest[];
    tripSegments: TripSegmentRequest[];
    tripAttachmentFiles: TripAttachmentFileRequest[];
}
