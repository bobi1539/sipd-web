"use client";

import { apiBasicSalaryDelete, apiBasicSalaryFindAllPagination } from "@/app/api/basic-salary";
import { apiPositionFindById } from "@/app/api/position";
import ButtonBackFull from "@/app/component/button/button-back-full";
import ButtonIcon from "@/app/component/button/button-icon";
import CustomDropdown from "@/app/component/dropdown/custom-dropdown";
import DropdownDelete from "@/app/component/dropdown/dropdown-delete";
import DropdownEdit from "@/app/component/dropdown/dropdown-edit";
import CustomTable from "@/app/component/table/custom-table";
import FooterTable from "@/app/component/table/footer-table";
import LoadingTable from "@/app/component/table/loading-table";
import ContentSearch from "@/app/component/text/content-search";
import ContentTitle from "@/app/component/text/content-title";
import { FE_NOT_FOUND, FE_POSITION } from "@/app/constant/endpoint-fe";
import { POSITION_ID_PARAM } from "@/app/constant/general";
import { SURE_TO_DELETE } from "@/app/constant/message";
import { paginationDefault } from "@/app/dto/dto/pagination";
import { BasicSalaryResponse } from "@/app/dto/response/basic-salary-response";
import { PaginationResponse } from "@/app/dto/response/pagination-response";
import { PositionResponse } from "@/app/dto/response/position-response";
import { buildBasicSalarySearch } from "@/app/dto/search/basic-salary-search";
import { formatNumber, getItemNumber } from "@/app/util/helper";
import { showConfirmDialog, showSuccessDialog } from "@/app/util/sweet-alert";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BasicSalaryCreate from "./create";
import BasicSalaryUpdate from "./update";
import { CustomTableHead } from "@/app/dto/dto/custom-table-head";

export default function BasicSalary() {
    const searchParams = useSearchParams();
    const positionId = Number(searchParams.get(POSITION_ID_PARAM));

    const [basicSalaryPages, setBasicSalaryPages] = useState<PaginationResponse<BasicSalaryResponse>>();
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [basicSalaryIdUpdate, setBasicSalaryIdUpdate] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [position, setPosition] = useState<PositionResponse>();

    const fetchApiBasicSalaryFindAllPagination = useCallback(async (): Promise<void> => {
        await apiPositionFindById(positionId)
            .then((response) => setPosition(response))
            .catch(() => redirect(FE_NOT_FOUND));
        await apiBasicSalaryFindAllPagination(buildBasicSalarySearch(positionId), paginationDefault(currentPage)).then((response) => setBasicSalaryPages(response));
        setIsLoading(false);
    }, [currentPage, positionId]);

    useEffect(() => {
        fetchApiBasicSalaryFindAllPagination();
    }, [fetchApiBasicSalaryFindAllPagination]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const handleEditBasicSalary = (id: number): void => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setBasicSalaryIdUpdate(id);
    };

    const handleDeleteBasicSalary = async (id: number): Promise<void> => {
        const result = await showConfirmDialog(SURE_TO_DELETE);
        if (result.isConfirmed) {
            try {
                await apiBasicSalaryDelete(id);
                await showSuccessDialog();
            } catch (error) {
                console.error(error);
            } finally {
                await fetchApiBasicSalaryFindAllPagination();
            }
        }
    };

    const tableHeads: CustomTableHead[] = [
        { name: "no", className: "text-center" },
        { name: "jumlah tahun kerja", className: "text-center" },
        { name: "gaji pokok", className: "text-right" },
        { name: "aksi", className: "text-center" },
    ];

    return (
        <div>
            <ContentTitle title={`Gaji Pokok ${position?.name}`} />
            <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
                <ContentSearch>
                    <div className="flex justify-start">
                        <ButtonBackFull href={FE_POSITION} />
                    </div>
                    <div className="flex justify-end">
                        <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Tambah Gaji Pokok" className="w-full md:w-auto" />
                    </div>
                </ContentSearch>
                <CustomTable heads={tableHeads}>
                    {isLoading ? (
                        <LoadingTable colSpan={tableHeads.length} />
                    ) : (
                        basicSalaryPages?.content.map((basicSalary, index) => (
                            <tr key={basicSalary.id} className="border-b text-center">
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    {getItemNumber(currentPage, index)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-center whitespace-nowrap">
                                    {formatNumber(basicSalary.totalYear)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-right whitespace-nowrap">
                                    {formatNumber(basicSalary.salaryAmount)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    <CustomDropdown>
                                        <>
                                            <DropdownEdit onClick={() => handleEditBasicSalary(basicSalary.id)} />
                                            <DropdownDelete onClick={() => handleDeleteBasicSalary(basicSalary.id)} />
                                        </>
                                    </CustomDropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={basicSalaryPages?.totalItem ?? 0} totalPage={basicSalaryPages?.totalPage ?? 0} handlePageChange={handlePageChange} />
                {isModalCreateOpen && <BasicSalaryCreate closeModal={() => setIsModalCreateOpen(false)} fetchApiBasicSalaryFindAllPagination={fetchApiBasicSalaryFindAllPagination} position={position} />}
                {isModalUpdateOpen && <BasicSalaryUpdate id={basicSalaryIdUpdate} closeModal={() => setIsModalUpdateOpen(false)} fetchApiBasicSalaryFindAllPagination={fetchApiBasicSalaryFindAllPagination} position={position} />}
            </section>
        </div>
    );
}
