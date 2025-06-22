"use client";
import { apiGetOptionsBusinessTrip } from "@/app/api/business-trip";
import ButtonBackFull from "@/app/component/button/button-back-full";
import ButtonLoadingSave from "@/app/component/button/button-loading-save";
import ButtonSave from "@/app/component/button/button-save";
import InputLabel from "@/app/component/input/input-label";
import InputSelectLabel from "@/app/component/input/input-select-label";
import TextArea from "@/app/component/input/text-area";
import Spinner from "@/app/component/spinner/spinner";
import ContentTitle from "@/app/component/text/content-title";
import { FE_BUSINESS_TRIP } from "@/app/constant/endpoint-fe";
import { DEFAULT_PAGE_NUMBER, INPUT_BUSINESS_TRIP_PARTICIPANT, INPUT_BUSINESS_TRIP_PARTICIPANT_TYPE, INPUT_BUSINESS_TRIP_PURPOSE, INPUT_BUSINESS_TRIP_TYPE } from "@/app/constant/general";
import { ICON_PLUS } from "@/app/constant/icon";
import { BusinessTripDetailResponse } from "@/app/dto/response/business-trip-detail-response";
import { BusinessTripOptionsResponse } from "@/app/dto/response/business-trip-options-response";
import { useCallback, useEffect, useState } from "react";
import ParticipantModal from "./participant/particpant-modal";
import { apiFindAllPaginationCity } from "@/app/api/city";
import { buildSearch } from "@/app/dto/dto/search";
import { Option } from "@/app/dto/dto/input-select-option";
import { citiesResponseToOptions } from "@/app/dto/response/city-response";

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
    const [isModalAddParticipantOpen, setIsModalAddParticipantOpen] = useState<boolean>(false);
    const [cityOptions, setCityOptions] = useState<Option[]>([]);
    const [inputCity, setInputCity] = useState<string>("");
    const [returnCityOption, setReturnCityOption] = useState<Option>();
    const [lastDestinationCity, setLastDestinationCity] = useState<Option>();

    const fetchApiMetadataBusinessTrip = useCallback(async (): Promise<void> => {
        setIsFormLoading(true);
        await apiGetOptionsBusinessTrip().then((response) => setBusinessTripOptions(response));
        setIsFormLoading(false);
    }, []);

    const fetchApiCity = useCallback(async (): Promise<void> => {
        await apiFindAllPaginationCity(buildSearch(inputCity, null, DEFAULT_PAGE_NUMBER, 20)).then((response) => setCityOptions(citiesResponseToOptions(response.content)));
    }, [inputCity]);

    useEffect(() => {
        fetchApiMetadataBusinessTrip();
    }, [fetchApiMetadataBusinessTrip]);

    useEffect(() => {
        fetchApiCity();
    }, [fetchApiCity]);

    const handleInputCityChange = (value: string): void => {
        setInputCity(value);
    };

    const handleDepartureCityChange = (option: Option | null): void => {
        if (option !== null) {
            setReturnCityOption(option);
        }
    };

    const handleLastDestinationCityChange = (option: Option | null): void => {
        if (option !== null) {
            setLastDestinationCity(option);
        }
    };

    const handleClickAddParticipant = (): void => {
        setIsModalAddParticipantOpen(true);
    };

    const handleCloseModal = (): void => {
        setIsModalAddParticipantOpen(false);
    };

    return (
        <div>
            <ContentTitle title={props.title} />
            {isFormLoading ? (
                <div className="h-32 flex justify-center items-center">
                    <Spinner />
                </div>
            ) : (
                <section>
                    <form onSubmit={props.submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <h1 className="font-bold text-xl">Detail Perjalanan Dinas</h1>
                                    <div className="my-4 grid grid-cols-1 gap-2">
                                        <InputSelectLabel label="Jenis Perjalanan Dinas" name={INPUT_BUSINESS_TRIP_TYPE} options={businessTripOptions?.tripTypes ?? []} required />
                                        <TextArea label="Maksud Perjalanan Dinas" name={INPUT_BUSINESS_TRIP_PURPOSE} />
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <h1 className="font-bold text-xl">Peserta Perjalanan Dinas</h1>
                                    <div className="my-4 grid grid-cols-1 gap-2">
                                        <InputSelectLabel label="Jumlah Peserta" name={INPUT_BUSINESS_TRIP_PARTICIPANT_TYPE} options={businessTripOptions?.participantTypes ?? []} required />
                                        <InputLabel label="Nama Peserta" name={INPUT_BUSINESS_TRIP_PARTICIPANT} type="text" required={true} disabled />
                                        <div className="flex justify-end">
                                            <button onClick={handleClickAddParticipant} type="button" className="text-white rounded text-xs px-2 py-1 flex gap-2 justify-center items-center bg-primary-700 hover:bg-primary-600">
                                                <i className={`${ICON_PLUS}`} />
                                                <span>Tambah Peserta</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <div>
                                    <h1 className="font-bold text-xl">Tujuan Perjalanan Dinas</h1>
                                    <h1>Perjalanan 1</h1>
                                    <div className="grid xl:grid-cols-2 gap-2 my-4">
                                        <InputSelectLabel label="Tempat Keberangkatan" name={"test1"} options={cityOptions} onChange={handleDepartureCityChange} onInputChange={handleInputCityChange} required />
                                        <InputSelectLabel label="Tempat Tujuan" name={"test1"} options={cityOptions} onChange={handleLastDestinationCityChange} onInputChange={handleInputCityChange} required />
                                        <InputLabel label="Tanggal Keberangkatan" name={"t1"} type="date" required={true} />
                                        <InputSelectLabel label="Transportasi" name={"transportasi"} options={businessTripOptions?.transportationModes ?? []} required />
                                    </div>
                                </div>
                                <div className="h-2"></div>
                                <div>
                                    <h1>Perjalanan Pulang</h1>
                                    <div className="grid xl:grid-cols-2 gap-2 my-4">
                                        <InputLabel label="Tempat Tujuan Terakhir" name={"t4"} type="text" required={true} value={lastDestinationCity?.label} disabled />
                                        <InputLabel label="Tempat Kepulangan" name={"t5"} type="text" required={true} value={returnCityOption?.label} disabled />
                                        <InputLabel label="Tanggal Kepulangan" name={"t1"} type="date" required={true} />
                                        <InputSelectLabel label="Transportasi" name={"transportasi"} options={businessTripOptions?.transportationModes ?? []} required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between py-4">
                            <ButtonBackFull href={FE_BUSINESS_TRIP} />
                            {props.isSaveLoading ? <ButtonLoadingSave /> : <ButtonSave />}
                        </div>
                    </form>
                    {isModalAddParticipantOpen && <ParticipantModal closeModal={handleCloseModal} />}
                </section>
            )}
        </div>
    );
}
