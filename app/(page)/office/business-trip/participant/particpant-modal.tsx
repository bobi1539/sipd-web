"use client";
import { apiFindAllPaginationEmployee } from "@/app/api/employee";
import ButtonIcon from "@/app/component/button/button-icon";
import InputSearch from "@/app/component/input/input-search";
import Modal from "@/app/component/modal/modal";
import CustomTable from "@/app/component/table/custom-table";
import FooterTable from "@/app/component/table/footer-table";
import LoadingTable from "@/app/component/table/loading-table";
import { DEFAULT_PAGE_NUMBER } from "@/app/constant/general";
import { CustomTableHead } from "@/app/dto/dto/custom-table-head";
import { buildSearch } from "@/app/dto/dto/search";
import { EmployeeResponse } from "@/app/dto/response/employee-response";
import { PaginationResponse } from "@/app/dto/response/pagination-response";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ParticipantModalProps {
    closeModal: () => void;
}

export default function ParticipantModal(props: Readonly<ParticipantModalProps>) {
    const [employees, setEmployees] = useState<PaginationResponse<EmployeeResponse>>();
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchApiFindAllPaginationEmployee = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        await apiFindAllPaginationEmployee(buildSearch(searchValue, false, currentPage, 4)).then((response) => setEmployees(response));
        setIsLoading(false);
    }, [currentPage, searchValue]);

    useEffect(() => {
        fetchApiFindAllPaginationEmployee();
    }, [fetchApiFindAllPaginationEmployee]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page - 1);
    };

    const tableHeads: CustomTableHead[] = [
        { name: "nama peserta", className: "text-left" },
        { name: "pilih", className: "text-center" },
    ];

    return (
        <Modal title="Pilih Peserta Perjalanan Dinas" className="max-w-xl" closeModal={props.closeModal}>
            <div>
                <div className="my-2">
                    <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
                </div>
                <CustomTable heads={tableHeads}>
                    {isLoading ? (
                        <LoadingTable colSpan={tableHeads.length} />
                    ) : (
                        employees?.content.map((employee) => (
                            <tr key={employee.id} className="border-b text-center">
                                <td scope="row" className="px-2 py-2 break-words text-left whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <Image key={employee.id} className="w-10 h-10 md:w-14 md:h-14 bg-gray-200 rounded-full" src={"/images/employee_profile.webp"} alt="Employee Profile" width={100} height={36} priority unoptimized />
                                        <h1>{employee.name}</h1>
                                    </div>
                                </td>
                                <td scope="row" className="px-2 py-1 whitespace-nowrap"></td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={employees?.totalElements ?? 0} totalPage={employees?.totalPages ?? 0} handlePageChange={handlePageChange} />
                <div className="flex justify-end mr-4 mb-2">
                    <ButtonIcon icon="fa-solid fa-check" text="Selesai" />
                </div>
            </div>
        </Modal>
    );
}
