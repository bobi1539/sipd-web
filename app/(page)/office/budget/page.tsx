"use client";
import { apiRoleDelete } from "@/app/api/role";
import ButtonIcon from "@/app/component/button/button-icon";
import InputSearch from "@/app/component/input/input-search";
import LoadingTable from "@/app/component/table/loading-table";
import CustomTable from "@/app/component/table/custom-table";
import ContentSearch from "@/app/component/text/content-search";
import ContentTitle from "@/app/component/text/content-title";
import { SURE_TO_DELETE } from "@/app/constant/message";
import { buildSearch } from "@/app/dto/dto/search";
import { PaginationResponse } from "@/app/dto/response/pagination-response";
import { showConfirmDialog, showSuccessDialog } from "@/app/util/sweet-alert";
import { useCallback, useEffect, useState } from "react";
import FooterTable from "@/app/component/table/footer-table";
import CustomDropdown from "@/app/component/dropdown/custom-dropdown";
import DropdownEdit from "@/app/component/dropdown/dropdown-edit";
import DropdownDelete from "@/app/component/dropdown/dropdown-delete";
import { getItemNumber } from "@/app/util/helper";
import { CustomTableHead } from "@/app/dto/dto/custom-table-head";
import { BudgetResponse } from "@/app/dto/response/budget-response";
import { apiBudgetFindAllPagination } from "@/app/api/budget";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/app/constant/general";

export default function Budget() {
    const [budgets, setBudgets] = useState<PaginationResponse<BudgetResponse>>();
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchApiBudgetFindAllPagination = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        await apiBudgetFindAllPagination(buildSearch(searchValue, null, currentPage, DEFAULT_PAGE_SIZE)).then((response) => setBudgets(response));
        setIsLoading(false);
    }, [currentPage, searchValue]);

    useEffect(() => {
        fetchApiBudgetFindAllPagination();
    }, [fetchApiBudgetFindAllPagination]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const handleEditRole = (id: number): void => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        console.log(id)
    };

    const handleDeleteRole = async (id: number): Promise<void> => {
        const result = await showConfirmDialog(SURE_TO_DELETE);
        if (result.isConfirmed) {
            try {
                await apiRoleDelete(id);
                await showSuccessDialog();
            } catch (error) {
                console.error(error);
            } finally {
                await fetchApiBudgetFindAllPagination();
            }
        }
    };
    const tableHeads: CustomTableHead[] = [
        { name: "no", className: "text-center" },
        { name: "nama anggaran", className: "text-left" },
        { name: "harga satuan", className: "text-left" },
        { name: "jumlah", className: "text-left" },
        { name: "total", className: "text-left" },
        { name: "digunakan", className: "text-left" },
        { name: "sisa", className: "text-right" },
        { name: "aksi", className: "text-center" },
    ];

    return (
        <div>
            <ContentTitle title="Data Anggaran" />
            <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
                <ContentSearch>
                    <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
                    <div className="flex justify-end">
                        <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Tambah Data Anggaran" className="w-full md:w-auto" />
                    </div>
                </ContentSearch>
                <CustomTable heads={tableHeads}>
                    {isLoading ? (
                        <LoadingTable colSpan={tableHeads.length} />
                    ) : (
                        budgets?.content.map((budget, index) => (
                            <tr key={budget.id} className="border-b text-center">
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    {getItemNumber(currentPage, index)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                                    {budget.name}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                                    {budget.price}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                                    {budget.quantity}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                                    {budget.total}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap text-red-700">
                                    {budget.used}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-right whitespace-nowrap text-green-700">
                                    {budget.remaining}
                                </td>
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    <CustomDropdown>
                                        <>
                                            <DropdownEdit onClick={() => handleEditRole(budget.id)} />
                                            <DropdownDelete onClick={() => handleDeleteRole(budget.id)} />
                                        </>
                                    </CustomDropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={budgets?.totalItem ?? 0} totalPage={budgets?.totalPage ?? 0} handlePageChange={handlePageChange} />
            </section>
        </div>
    );
}
