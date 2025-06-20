"use client";

import { apiAllowanceDelete, apiAllowanceFindAllPagination } from "@/app/api/allowance";
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
import { AllowanceResponse } from "@/app/dto/response/allowance-response";
import { PaginationResponse } from "@/app/dto/response/pagination-response";
import { PositionResponse } from "@/app/dto/response/position-response";
import { buildAllowanceSearch } from "@/app/dto/search/allowance-search";
import { formatNumber, getItemNumber } from "@/app/util/helper";
import { showConfirmDialog, showSuccessDialog } from "@/app/util/sweet-alert";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AllowanceCreate from "./create";
import AllowanceUpdate from "./update";
import { CustomTableHead } from "@/app/dto/dto/custom-table-head";

export default function Allowance() {
    const searchParams = useSearchParams();
    const positionId = Number(searchParams.get(POSITION_ID_PARAM));

    const [allowancePages, setAllowancePages] = useState<PaginationResponse<AllowanceResponse>>();
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [allowanceIdUpdate, setAllowanceIdUpdate] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [position, setPosition] = useState<PositionResponse>();

    const fetchApiAllowanceFindAllPagination = useCallback(async (): Promise<void> => {
        await apiPositionFindById(positionId)
            .then((response) => setPosition(response))
            .catch(() => redirect(FE_NOT_FOUND));
        await apiAllowanceFindAllPagination(buildAllowanceSearch(positionId), paginationDefault(currentPage)).then((response) => setAllowancePages(response));
        setIsLoading(false);
    }, [currentPage, positionId]);

    useEffect(() => {
        fetchApiAllowanceFindAllPagination();
    }, [fetchApiAllowanceFindAllPagination]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const handleEditAllowance = (id: number): void => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setAllowanceIdUpdate(id);
    };

    const handleDeleteAllowance = async (id: number): Promise<void> => {
        const result = await showConfirmDialog(SURE_TO_DELETE);
        if (result.isConfirmed) {
            try {
                await apiAllowanceDelete(id);
                await showSuccessDialog();
            } catch (error) {
                console.error(error);
            } finally {
                await fetchApiAllowanceFindAllPagination();
            }
        }
    };

    const tableHeads: CustomTableHead[] = [
        { name: "no", className: "text-center" },
        { name: "jenis tunjangan", className: "text-left pl-2.5" },
        { name: "jumlah tunjangan", className: "text-right" },
        { name: "aksi", className: "text-center" },
    ];

    return (
        <div>
            <ContentTitle title={`Tunjangan Untuk ${position?.name}`} />
            <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
                <ContentSearch>
                    <div className="flex justify-start">
                        <ButtonBackFull href={FE_POSITION} />
                    </div>
                    <div className="flex justify-end">
                        <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Tambah Tunjangan" className="w-full md:w-auto" />
                    </div>
                </ContentSearch>
                <CustomTable heads={tableHeads}>
                    {isLoading ? (
                        <LoadingTable colSpan={tableHeads.length} />
                    ) : (
                        allowancePages?.data.map((allowance, index) => (
                            <tr key={allowance.id} className="border-b text-center">
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    {getItemNumber(currentPage, index)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap capitalize">
                                    {allowance.allowanceType.name}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-right whitespace-nowrap">
                                    {formatNumber(allowance.allowanceAmount)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    <CustomDropdown>
                                        <>
                                            <DropdownEdit onClick={() => handleEditAllowance(allowance.id)} />
                                            <DropdownDelete onClick={() => handleDeleteAllowance(allowance.id)} />
                                        </>
                                    </CustomDropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={allowancePages?.totalItem ?? 0} totalPage={allowancePages?.totalPage ?? 0} handlePageChange={handlePageChange} />
                {isModalCreateOpen && <AllowanceCreate closeModal={() => setIsModalCreateOpen(false)} fetchApiAllowanceFindAllPagination={fetchApiAllowanceFindAllPagination} position={position} />}
                {isModalUpdateOpen && <AllowanceUpdate closeModal={() => setIsModalUpdateOpen(false)} fetchApiAllowanceFindAllPagination={fetchApiAllowanceFindAllPagination} position={position} id={allowanceIdUpdate} />}
            </section>
        </div>
    );
}
