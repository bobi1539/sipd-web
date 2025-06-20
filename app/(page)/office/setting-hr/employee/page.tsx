"use client";

import { apiEmployeeDelete, apiEmployeeFindAllPagination } from "@/app/api/employee";
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
import { CustomTableHead } from "@/app/dto/dto/custom-table-head";
import { paginationDefault } from "@/app/dto/dto/pagination";
import { buildSearch } from "@/app/dto/dto/search";
import { EmployeeResponse } from "@/app/dto/response/employee-response";
import { PaginationResponse } from "@/app/dto/response/pagination-response";
import { getItemNumber } from "@/app/util/helper";
import { showConfirmDialog, showSuccessDialog } from "@/app/util/sweet-alert";
import { useCallback, useEffect, useState } from "react";

export default function Employee() {
    const [employeePages, setEmployeePages] = useState<PaginationResponse<EmployeeResponse>>();
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [employeeIdUpdate, setEmployeeIdUpdate] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchApiEmployeeFindAllPagination = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        await apiEmployeeFindAllPagination(buildSearch(searchValue), paginationDefault(currentPage)).then((response) => setEmployeePages(response));
        setIsLoading(false);
    }, [currentPage, searchValue]);

    useEffect(() => {
        fetchApiEmployeeFindAllPagination();
    }, [fetchApiEmployeeFindAllPagination]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const handleEditEmployee = (id: number): void => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setEmployeeIdUpdate(id);
        console.log(employeeIdUpdate);
    };

    const handleDeleteEmployee = async (id: number): Promise<void> => {
        const result = await showConfirmDialog(SURE_TO_DELETE);
        if (result.isConfirmed) {
            try {
                await apiEmployeeDelete(id);
                await showSuccessDialog();
            } catch (error) {
                console.error(error);
            } finally {
                await fetchApiEmployeeFindAllPagination();
            }
        }
    };
    const tableHeads: CustomTableHead[] = [
        { name: "no", className: "text-center" },
        { name: "nama", className: "text-left pl-2.5" },
        { name: "no handphone", className: "text-left pl-2.5" },
        { name: "email", className: "text-left pl-2.5" },
        { name: "jabatan", className: "text-left pl-2.5" },
        { name: "aksi", className: "text-center" },
    ];

    return (
        <div>
            <ContentTitle title="Karyawan" />
            <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
                <ContentSearch>
                    <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
                    <div className="flex justify-end">
                        <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Tambah Karyawan" className="w-full md:w-auto" />
                    </div>
                </ContentSearch>
                <CustomTable heads={tableHeads}>
                    {isLoading ? (
                        <LoadingTable colSpan={tableHeads.length} />
                    ) : (
                        employeePages?.data.map((employee, index) => (
                            <tr key={employee.id} className="border-b text-center">
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    {getItemNumber(currentPage, index)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap capitalize">
                                    {employee.name}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                                    {employee.phoneNumber}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                                    {employee.email}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap capitalize">
                                    {employee.position.name}
                                </td>
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    <CustomDropdown>
                                        <>
                                            <DropdownEdit onClick={() => handleEditEmployee(employee.id)} />
                                            <DropdownDelete onClick={() => handleDeleteEmployee(employee.id)} />
                                        </>
                                    </CustomDropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={employeePages?.totalItem ?? 0} totalPage={employeePages?.totalPage ?? 0} handlePageChange={handlePageChange} />
            </section>
        </div>
    );
}
