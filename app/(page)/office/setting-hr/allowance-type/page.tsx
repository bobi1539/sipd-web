"use client";

import { apiAllowanceTypeDelete, apiAllowanceTypeFindAllPagination } from "@/app/api/allowance-type";
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
import { AllowanceTypeResponse } from "@/app/dto/response/allowance-type-response";
import { PaginationResponse } from "@/app/dto/response/pagination-response";
import { getItemNumber } from "@/app/util/helper";
import { showConfirmDialog, showSuccessDialog } from "@/app/util/sweet-alert";
import { useCallback, useEffect, useState } from "react";
import AllowanceTypeCreate from "./create";
import AllowanceTypeUpdate from "./update";
import { CustomTableHead } from "@/app/dto/dto/custom-table-head";

export default function AllowanceType() {
    const [allowanceTypePages, setAllowanceTypePages] = useState<PaginationResponse<AllowanceTypeResponse>>();
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [allowanceTypeIdUpdate, setAllowanceTypeIdUpdate] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchApiAllowanceTypeFindAllPagination = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        await apiAllowanceTypeFindAllPagination(buildSearch(searchValue), paginationDefault(currentPage)).then((response) => setAllowanceTypePages(response));
        setIsLoading(false);
    }, [currentPage, searchValue]);

    useEffect(() => {
        fetchApiAllowanceTypeFindAllPagination();
    }, [fetchApiAllowanceTypeFindAllPagination]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const handleEditAllowanceType = (id: number): void => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setAllowanceTypeIdUpdate(id);
    };

    const handleDeleteAllowanceType = async (id: number): Promise<void> => {
        const result = await showConfirmDialog(SURE_TO_DELETE);
        if (result.isConfirmed) {
            try {
                await apiAllowanceTypeDelete(id);
                await showSuccessDialog();
            } catch (error) {
                console.error(error);
            } finally {
                await fetchApiAllowanceTypeFindAllPagination();
            }
        }
    };

    const tableHeads: CustomTableHead[] = [
        { name: "no", className: "text-center" },
        { name: "jenis tunjangan", className: "text-left pl-2.5" },
        { name: "aksi", className: "text-center" },
    ];

    return (
        <div>
            <ContentTitle title="Jenis Tunjangan" />
            <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
                <ContentSearch>
                    <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
                    <div className="flex justify-end">
                        <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Tambah Jenis Tunjangan" className="w-full md:w-auto" />
                    </div>
                </ContentSearch>
                <CustomTable heads={tableHeads}>
                    {isLoading ? (
                        <LoadingTable colSpan={tableHeads.length} />
                    ) : (
                        allowanceTypePages?.data.map((allowanceType, index) => (
                            <tr key={allowanceType.id} className="border-b text-center">
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    {getItemNumber(currentPage, index)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap capitalize">
                                    {allowanceType.name}
                                </td>
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    <CustomDropdown>
                                        <>
                                            <DropdownEdit onClick={() => handleEditAllowanceType(allowanceType.id)} />
                                            <DropdownDelete onClick={() => handleDeleteAllowanceType(allowanceType.id)} />
                                        </>
                                    </CustomDropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={allowanceTypePages?.totalItem ?? 0} totalPage={allowanceTypePages?.totalPage ?? 0} handlePageChange={handlePageChange} />
                {isModalCreateOpen && <AllowanceTypeCreate closeModal={() => setIsModalCreateOpen(false)} fetchApiAllowanceTypeFindAllPagination={fetchApiAllowanceTypeFindAllPagination} />}
                {isModalUpdateOpen && <AllowanceTypeUpdate id={allowanceTypeIdUpdate} closeModal={() => setIsModalUpdateOpen(false)} fetchApiAllowanceTypeFindAllPagination={fetchApiAllowanceTypeFindAllPagination} />}
            </section>
        </div>
    );
}
