"use client";
import ButtonIcon from "@/app/component/button/button-icon";
import InputSearch from "@/app/component/input/input-search";
import LoadingTable from "@/app/component/table/loading-table";
import CustomTable from "@/app/component/table/custom-table";
import ContentSearch from "@/app/component/text/content-search";
import ContentTitle from "@/app/component/text/content-title";
import { buildSearch } from "@/app/dto/dto/search";
import { PaginationResponse } from "@/app/dto/response/pagination-response";
import { useCallback, useEffect, useState } from "react";
import FooterTable from "@/app/component/table/footer-table";
import CustomDropdown from "@/app/component/dropdown/custom-dropdown";
import DropdownEdit from "@/app/component/dropdown/dropdown-edit";
import DropdownDelete from "@/app/component/dropdown/dropdown-delete";
import { getItemNumber } from "@/app/util/helper";
import { CustomTableHead } from "@/app/dto/dto/custom-table-head";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/app/constant/general";
import DropdownRestore from "@/app/component/dropdown/dropdown-restore";
import { BusinessTripSimpleResponse } from "@/app/dto/response/business-trip-simple-response";
import { apiFindAllPaginationBusinessTrip } from "@/app/api/business-trip";
import DeleteBusinessTrip from "./delete";
import RestoreBusinessTrip from "./restore";

export default function BusinessTrip() {
    const [businessTrips, setBusinessTrips] = useState<PaginationResponse<BusinessTripSimpleResponse>>();
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [isModalRestoreOpen, setIsModalRestoreOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [businessTripId, setBusinessTripId] = useState<number>(0);

    const fetchApiFindAllPaginationBusinessTrip = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        await apiFindAllPaginationBusinessTrip(buildSearch(searchValue, null, currentPage, DEFAULT_PAGE_SIZE)).then((response) => setBusinessTrips(response));
        setIsLoading(false);
    }, [currentPage, searchValue]);

    useEffect(() => {
        fetchApiFindAllPaginationBusinessTrip();
    }, [fetchApiFindAllPaginationBusinessTrip]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page - 1);
    };

    const handleEditBusinessTrip = (id: number): void => {
        setBusinessTripId(id);
    };

    const handleDeleteBusinessTrip = async (id: number): Promise<void> => {
        setIsModalDeleteOpen(true);
        setBusinessTripId(id);
    };

    const handleRestoreBusinessTrip = async (id: number): Promise<void> => {
        setIsModalRestoreOpen(true);
        setBusinessTripId(id);
    };

    const handleCloseModal = (): void => {
        setIsModalDeleteOpen(false);
        setIsModalRestoreOpen(false);
    };

    const tableHeads: CustomTableHead[] = [
        { name: "no", className: "text-center" },
        { name: "maksud", className: "text-left" },
        { name: "nama peserta", className: "text-left" },
        { name: "tanggal perjalanan", className: "text-left" },
        { name: "tujuan", className: "text-left" },
        { name: "status", className: "text-center" },
        { name: "aksi", className: "text-center" },
    ];

    return (
        <div>
            <ContentTitle title="Data Perjalanan Dinas" />
            <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
                <ContentSearch>
                    <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
                    <div className="flex justify-end">
                        <ButtonIcon onClick={() => console.log("hello")} type="button" icon="fa-solid fa-plus" text="Ajukan Perjalanan Dinas" className="w-full md:w-auto" />
                    </div>
                </ContentSearch>
                <CustomTable heads={tableHeads}>
                    {isLoading ? (
                        <LoadingTable colSpan={tableHeads.length} />
                    ) : (
                        businessTrips?.content.map((businessTrip, index) => (
                            <tr key={businessTrip.id} className={`border-b text-center ${businessTrip.deleted ? "line-through text-red-700" : ""}`}>
                                <td scope="row" className="px-2 py-1 whitespace-nowrap">
                                    {getItemNumber(currentPage, index)}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-left whitespace-nowrap">
                                    {businessTrip.purpose}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-left whitespace-nowrap">
                                    {businessTrip.participantName}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-left whitespace-nowrap">
                                    {businessTrip.tripPeriod}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-left whitespace-nowrap">
                                    {businessTrip.tripPlace}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-center whitespace-nowra">
                                    <span className={`${businessTrip.statusColor} text-white px-3 py-1.5 rounded-md text-xs`}>{businessTrip.status}</span>
                                </td>
                                <td scope="row" className="px-2 py-1 whitespace-nowrap">
                                    <CustomDropdown>
                                        <>
                                            {businessTrip.deleted ? <DropdownRestore onClick={() => handleRestoreBusinessTrip(businessTrip.id)} /> : <DropdownEdit onClick={() => handleEditBusinessTrip(businessTrip.id)} />}
                                            <DropdownDelete onClick={() => handleDeleteBusinessTrip(businessTrip.id)} />
                                        </>
                                    </CustomDropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={businessTrips?.totalElements ?? 0} totalPage={businessTrips?.totalPages ?? 0} handlePageChange={handlePageChange} />
                {isModalDeleteOpen && <DeleteBusinessTrip closeModal={handleCloseModal} fetchApiFindAllPaginationBusinessTrip={fetchApiFindAllPaginationBusinessTrip} id={businessTripId} />}
                {isModalRestoreOpen && <RestoreBusinessTrip closeModal={handleCloseModal} fetchApiFindAllPaginationBusinessTrip={fetchApiFindAllPaginationBusinessTrip} id={businessTripId} />}
            </section>
        </div>
    );
}
