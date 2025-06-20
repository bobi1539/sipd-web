"use client";

import { apiPositionDelete, apiPositionFindAllPagination } from "@/app/api/position";
import ButtonIcon from "@/app/component/button/button-icon";
import CustomDropdown from "@/app/component/dropdown/custom-dropdown";
import DropdownDelete from "@/app/component/dropdown/dropdown-delete";
import DropdownEdit from "@/app/component/dropdown/dropdown-edit";
import InputSearch from "@/app/component/input/input-search";
import CustomTable from "@/app/component/table/custom-table";
import FooterTable from "@/app/component/table/footer-table";
import LoadingTable from "@/app/component/table/loading-table";
import ContentSearch from "@/app/component/text/content-search";
import ContentTitle from "@/app/component/text/content-title";
import { SURE_TO_DELETE } from "@/app/constant/message";
import { paginationDefault } from "@/app/dto/dto/pagination";
import { buildSearch } from "@/app/dto/dto/search";
import { PaginationResponse } from "@/app/dto/response/pagination-response";
import { PositionResponse } from "@/app/dto/response/position-response";
import { getItemNumber } from "@/app/util/helper";
import { showConfirmDialog, showSuccessDialog } from "@/app/util/sweet-alert";
import { useCallback, useEffect, useState } from "react";
import PositionCreate from "./create";
import PositionUpdate from "./update";
import CustomDropdownItem from "@/app/component/dropdown/custom-dropdown-item";
import { ICON_MONEY, ICON_CREDIT_CARD, POSITION_ID_SEARCH_PARAM, TEXT_ALLOWANCE, TEXT_GRAY_700, TEXT_SALARY } from "@/app/constant/general";
import { useRouter } from "next/navigation";
import { FE_ALLOWANCE, FE_BASIC_SALARY } from "@/app/constant/endpoint-fe";
import { CustomTableHead } from "@/app/dto/dto/custom-table-head";

export default function Position() {
    const [positionPages, setPositionPages] = useState<PaginationResponse<PositionResponse>>();
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [positionIdUpdate, setPositionIdUpdate] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const fetchApiPositionFindAllPagination = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        await apiPositionFindAllPagination(buildSearch(searchValue), paginationDefault(currentPage)).then((response) => setPositionPages(response));
        setIsLoading(false);
    }, [currentPage, searchValue]);

    useEffect(() => {
        fetchApiPositionFindAllPagination();
    }, [fetchApiPositionFindAllPagination]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const handlePositionBasicSalary = (id: number): void => {
        router.push(getUrlPositionBasicSalary(id));
    };

    const getUrlPositionBasicSalary = (id: number): string => {
        return FE_BASIC_SALARY + POSITION_ID_SEARCH_PARAM + id;
    };

    const handlePositionAllowance = (id: number): void => {
        router.push(getUrlPositionAllowance(id));
    };

    const getUrlPositionAllowance = (id: number): string => {
        return FE_ALLOWANCE + POSITION_ID_SEARCH_PARAM + id;
    };

    const handleEditPosition = (id: number): void => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setPositionIdUpdate(id);
    };

    const handleDeletePosition = async (id: number): Promise<void> => {
        const result = await showConfirmDialog(SURE_TO_DELETE);
        if (result.isConfirmed) {
            try {
                await apiPositionDelete(id);
                await showSuccessDialog();
            } catch (error) {
                console.error(error);
            } finally {
                await fetchApiPositionFindAllPagination();
            }
        }
    };

    const tableHeads: CustomTableHead[] = [
        { name: "no", className: "text-center" },
        { name: "jabatan", className: "text-left pl-2.5" },
        { name: "aksi", className: "text-center" },
    ];

    return (
        <div>
            <ContentTitle title="Jabatan" />
            <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
                <ContentSearch>
                    <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
                    <div className="flex justify-end">
                        <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Tambah Jabatan" className="w-full md:w-auto" />
                    </div>
                </ContentSearch>
                <CustomTable heads={tableHeads}>
                    {isLoading ? (
                        <LoadingTable colSpan={tableHeads.length} />
                    ) : (
                        positionPages?.content.map((position, index) => (
                            <tr key={position.id} className="border-b text-center">
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    {getItemNumber(currentPage, index)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap capitalize">
                                    {position.name}
                                </td>
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    <CustomDropdown>
                                        <>
                                            <CustomDropdownItem onClick={() => handlePositionBasicSalary(position.id)} className={TEXT_GRAY_700} icon={ICON_MONEY} text={TEXT_SALARY} />
                                            <CustomDropdownItem onClick={() => handlePositionAllowance(position.id)} className={TEXT_GRAY_700} icon={ICON_CREDIT_CARD} text={TEXT_ALLOWANCE} />
                                            <DropdownEdit onClick={() => handleEditPosition(position.id)} />
                                            <DropdownDelete onClick={() => handleDeletePosition(position.id)} />
                                        </>
                                    </CustomDropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={positionPages?.totalItem ?? 0} totalPage={positionPages?.totalPage ?? 0} handlePageChange={handlePageChange} />
                {isModalCreateOpen && <PositionCreate closeModal={() => setIsModalCreateOpen(false)} fetchApiPositionFindAllPagination={fetchApiPositionFindAllPagination} />}
                {isModalUpdateOpen && <PositionUpdate id={positionIdUpdate} closeModal={() => setIsModalUpdateOpen(false)} fetchApiPositionFindAllPagination={fetchApiPositionFindAllPagination} />}
            </section>
        </div>
    );
}
