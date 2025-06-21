import { TripParticipantResponse } from "./trip-participant-response";
import { BaseMasterResponse } from "./base-master-response";
import { TripSegmentResponse } from "./trip-segment-response";
import { TripAttachmentFileResponse } from "./trip-attachment-file-response";

export interface BusinessTripDetailResponse extends BaseMasterResponse {
    id: number;
    purpose: string;
    approvalFile: string;
    businessTripStatus: string;
    businessTripType: string;
    participantType: string;
    tripParticipants: TripParticipantResponse[];
    tripSegments: TripSegmentResponse[];
    tripAttachmentFiles: TripAttachmentFileResponse[];
}
