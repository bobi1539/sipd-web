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
import { formatNumber, getItemNumber } from "@/app/util/helper";
import { CustomTableHead } from "@/app/dto/dto/custom-table-head";
import { BudgetResponse } from "@/app/dto/response/budget-response";
import { apiFindAllPaginationBudget } from "@/app/api/budget";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/app/constant/general";
import { formatNumberToRupiah } from "@/app/helper/currency-helper";
import CreateBudget from "./create";
import UpdateBudget from "./update";
import DeleteBudget from "./delete";
import DropdownRestore from "@/app/component/dropdown/dropdown-restore";
import RestoreBudget from "./restore";

export default function Budget() {
    const [budgets, setBudgets] = useState<PaginationResponse<BudgetResponse>>();
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [isModalRestoreOpen, setIsModalRestoreOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [budgetId, setBudgetId] = useState<number>(0);

    const fetchApiFindAllPaginationBudget = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        await apiFindAllPaginationBudget(buildSearch(searchValue, null, currentPage, DEFAULT_PAGE_SIZE)).then((response) => setBudgets(response));
        setIsLoading(false);
    }, [currentPage, searchValue]);

    useEffect(() => {
        fetchApiFindAllPaginationBudget();
    }, [fetchApiFindAllPaginationBudget]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page - 1);
    };

    const handleEditBudget = (id: number): void => {
        setIsModalUpdateOpen(true);
        setBudgetId(id);
    };

    const handleDeleteBudget = (id: number): void => {
        setIsModalDeleteOpen(true);
        setBudgetId(id);
    };

    const handleRestoreBudget = (id: number): void => {
        setIsModalRestoreOpen(true);
        setBudgetId(id);
    };

    const handleCloseModal = (): void => {
        setIsModalCreateOpen(false);
        setIsModalUpdateOpen(false);
        setIsModalDeleteOpen(false);
        setIsModalRestoreOpen(false);
    };

    const tableHeads: CustomTableHead[] = [
        { name: "no", className: "text-center" },
        { name: "nama anggaran", className: "text-left" },
        { name: "harga satuan", className: "text-right" },
        { name: "jumlah", className: "text-right" },
        { name: "total", className: "text-right" },
        { name: "digunakan", className: "text-right" },
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
                            <tr key={budget.id} className={`border-b text-center ${budget.deleted ? "line-through text-red-700" : ""}`}>
                                <td scope="row" className="px-2 py-1 whitespace-nowrap">
                                    {getItemNumber(currentPage, index)}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-left whitespace-nowrap">
                                    {budget.name}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-right whitespace-nowrap">
                                    {formatNumberToRupiah(budget.price)}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-right whitespace-nowrap">
                                    {formatNumber(budget.quantity)}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-right whitespace-nowrap">
                                    {formatNumberToRupiah(budget.total)}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-right whitespace-nowrap text-red-700">
                                    {formatNumberToRupiah(budget.used)}
                                </td>
                                <td scope="row" className="px-2 py-1 break-words text-right whitespace-nowrap text-green-700">
                                    {formatNumberToRupiah(budget.remaining)}
                                </td>
                                <td scope="row" className="px-2 py-1 whitespace-nowrap">
                                    <CustomDropdown>
                                        <>
                                            {budget.deleted ? <DropdownRestore onClick={() => handleRestoreBudget(budget.id)} /> : <DropdownEdit onClick={() => handleEditBudget(budget.id)} />}
                                            <DropdownDelete onClick={() => handleDeleteBudget(budget.id)} />
                                        </>
                                    </CustomDropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={budgets?.totalElements ?? 0} totalPage={budgets?.totalPages ?? 0} handlePageChange={handlePageChange} />
                {isModalCreateOpen && <CreateBudget closeModal={handleCloseModal} fetchApiFindAllPaginationBudget={fetchApiFindAllPaginationBudget} />}
                {isModalUpdateOpen && <UpdateBudget closeModal={handleCloseModal} fetchApiFindAllPaginationBudget={fetchApiFindAllPaginationBudget} id={budgetId} />}
                {isModalDeleteOpen && <DeleteBudget closeModal={handleCloseModal} fetchApiFindAllPaginationBudget={fetchApiFindAllPaginationBudget} id={budgetId} />}
                {isModalRestoreOpen && <RestoreBudget closeModal={handleCloseModal} fetchApiFindAllPaginationBudget={fetchApiFindAllPaginationBudget} id={budgetId} />}
            </section>
        </div>
    );
}
