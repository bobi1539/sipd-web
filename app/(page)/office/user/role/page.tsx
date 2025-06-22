"use client";

import { apiRoleDelete, apiRoleFindAllPagination } from "@/app/api/role";
import ButtonIcon from "@/app/component/button/button-icon";
import InputSearch from "@/app/component/input/input-search";
import LoadingTable from "@/app/component/table/loading-table";
import CustomTable from "@/app/component/table/custom-table";
import ContentSearch from "@/app/component/text/content-search";
import ContentTitle from "@/app/component/text/content-title";
import { SURE_TO_DELETE } from "@/app/constant/message";
import { paginationDefault } from "@/app/dto/dto/pagination";
import { buildSearch } from "@/app/dto/dto/search";
import { PaginationResponse } from "@/app/dto/response/pagination-response";
import { RoleResponse } from "@/app/dto/response/role-response";
import { showConfirmDialog, showSuccessDialog } from "@/app/util/sweet-alert";
import { useCallback, useEffect, useState } from "react";
import FooterTable from "@/app/component/table/footer-table";
import CustomDropdown from "@/app/component/dropdown/custom-dropdown";
import DropdownUpdate from "@/app/component/dropdown/dropdown-update";
import DropdownDelete from "@/app/component/dropdown/dropdown-delete";
import { getItemNumber } from "@/app/util/helper";
import RoleCreate from "./create";
import RoleUpdate from "./update";
import { CustomTableHead } from "@/app/dto/dto/custom-table-head";

export default function Role() {
    const [rolePages, setRolePages] = useState<PaginationResponse<RoleResponse>>();
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [roleIdUpdate, setRoleIdUpdate] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchApiRoleFindAllPagination = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        await apiRoleFindAllPagination(buildSearch(searchValue), paginationDefault(currentPage)).then((response) => setRolePages(response));
        setIsLoading(false);
    }, [currentPage, searchValue]);

    useEffect(() => {
        fetchApiRoleFindAllPagination();
    }, [fetchApiRoleFindAllPagination]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const handleEditRole = (id: number): void => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setRoleIdUpdate(id);
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
                await fetchApiRoleFindAllPagination();
            }
        }
    };
    const tableHeads: CustomTableHead[] = [
        { name: "no", className: "text-center" },
        { name: "nama role", className: "text-left pl-2.5" },
        { name: "aksi", className: "text-center" },
    ];

    return (
        <div>
            <ContentTitle title="User Role" />
            <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
                <ContentSearch>
                    <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
                    <div className="flex justify-end">
                        <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Tambah Role" className="w-full md:w-auto" />
                    </div>
                </ContentSearch>
                <CustomTable heads={tableHeads}>
                    {isLoading ? (
                        <LoadingTable colSpan={tableHeads.length} />
                    ) : (
                        rolePages?.content.map((role, index) => (
                            <tr key={role.id} className="border-b text-center">
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    {getItemNumber(currentPage, index)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                                    {role.name}
                                </td>
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    <CustomDropdown>
                                        <>
                                            <DropdownUpdate onClick={() => handleEditRole(role.id)} />
                                            <DropdownDelete onClick={() => handleDeleteRole(role.id)} />
                                        </>
                                    </CustomDropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={rolePages?.totalItem ?? 0} totalPage={rolePages?.totalPage ?? 0} handlePageChange={handlePageChange} />
                {isModalCreateOpen && <RoleCreate closeModal={() => setIsModalCreateOpen(false)} fetchApiRoleFindAllPagination={fetchApiRoleFindAllPagination} />}
                {isModalUpdateOpen && <RoleUpdate id={roleIdUpdate} closeModal={() => setIsModalUpdateOpen(false)} fetchApiRoleFindAllPagination={fetchApiRoleFindAllPagination} />}
            </section>
        </div>
    );
}
