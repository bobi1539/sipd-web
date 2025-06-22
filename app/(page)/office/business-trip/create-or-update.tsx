"use client";;
import { apiGetOptionsBusinessTrip } from "@/app/api/business-trip";
import ButtonLoadingSave from "@/app/component/button/button-loading-save";
import ButtonSave from "@/app/component/button/button-save";
import InputSelectLabel from "@/app/component/input/input-select-label";
import TextArea from "@/app/component/input/text-area";
import Spinner from "@/app/component/spinner/spinner";
import ContentTitle from "@/app/component/text/content-title";
import { INPUT_BUSINESS_TRIP_PURPOSE, INPUT_BUSINESS_TRIP_TYPE } from "@/app/constant/general";
import { BusinessTripDetailResponse } from "@/app/dto/response/business-trip-detail-response";
import { BusinessTripOptionsResponse } from "@/app/dto/response/business-trip-options-response";
import { useCallback, useEffect, useState } from "react";

interface CreateOrUpdateBusinessTripProps {
    title: string;
    isFormLoading: boolean;
    isSaveLoading: boolean;
    submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    businessTrip?: BusinessTripDetailResponse;
}

export default function CreateOrUpdateBusinessTrip(props: Readonly<CreateOrUpdateBusinessTripProps>) {
    const [isFormLoading, setIsFormLoading] = useState<boolean>(props.isFormLoading);
    const [businessTripOptions, setBusinessTripOptions] = useState<BusinessTripOptionsResponse>();

    const fetchApiMetadataBusinessTrip = useCallback(async (): Promise<void> => {
        setIsFormLoading(true);
        await apiGetOptionsBusinessTrip().then((response) => setBusinessTripOptions(response));
        setIsFormLoading(false);
    }, []);

    useEffect(() => {
        fetchApiMetadataBusinessTrip();
    }, [fetchApiMetadataBusinessTrip]);

    return (
        <div>
            <ContentTitle title={props.title} />
            <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
                {isFormLoading ? (
                    <div className="h-32 flex justify-center items-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="mx-4">
                        <form onSubmit={props.submit}>
                            <div className="my-4 grid grid-cols-1 gap-2">
                                <InputSelectLabel label="Jenis Perjalanan Dinas" name={INPUT_BUSINESS_TRIP_TYPE} options={businessTripOptions?.tripTypes ?? []} required />
                                <TextArea label="Maksud Perjalanan Dinas" name={INPUT_BUSINESS_TRIP_PURPOSE} />
                            </div>
                            <div className="flex justify-end">{props.isSaveLoading ? <ButtonLoadingSave /> : <ButtonSave />}</div>
                        </form>
                    </div>
                )}
            </section>
        </div>
    );
}
