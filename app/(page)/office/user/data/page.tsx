"use client";

import { apiUserDelete, apiUserFindAllPagination } from "@/app/api/user";
import ButtonIcon from "@/app/component/button/button-icon";
import CustomDropdown from "@/app/component/dropdown/custom-dropdown";
import DropdownDelete from "@/app/component/dropdown/dropdown-delete";
import DropdownUpdate from "@/app/component/dropdown/dropdown-update";
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
import { PaginationResponse } from "@/app/dto/response/pagination-response";
import { UserResponse } from "@/app/dto/response/user-response";
import { getItemNumber } from "@/app/util/helper";
import { showConfirmDialog, showSuccessDialog } from "@/app/util/sweet-alert";
import { useCallback, useEffect, useState } from "react";
import UserCreate from "./create";
import UserUpdate from "./update";

export default function User() {
    const [userPages, setUserPages] = useState<PaginationResponse<UserResponse>>();
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [userIdUpdate, setUserIdUpdate] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchApiUserFindAllPagination = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        await apiUserFindAllPagination(buildSearch(searchValue), paginationDefault(currentPage)).then((response) => setUserPages(response));
        setIsLoading(false);
    }, [currentPage, searchValue]);

    useEffect(() => {
        fetchApiUserFindAllPagination();
    }, [fetchApiUserFindAllPagination]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const handleEditUser = (id: number): void => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
        setUserIdUpdate(id);
        console.log(userIdUpdate);
    };

    const handleDeleteUser = async (roleId: number): Promise<void> => {
        const result = await showConfirmDialog(SURE_TO_DELETE);
        if (result.isConfirmed) {
            try {
                await apiUserDelete(roleId);
                await showSuccessDialog();
            } catch (error) {
                console.error(error);
            } finally {
                await fetchApiUserFindAllPagination();
            }
        }
    };

    const tableHeads: CustomTableHead[] = [
        { name: "no", className: "text-center" },
        { name: "nama", className: "text-left pl-2.5" },
        { name: "username", className: "text-left pl-2.5" },
        { name: "role", className: "text-left pl-2.5" },
        { name: "aksi", className: "text-center" },
    ];

    return (
        <div>
            <ContentTitle title="User" />
            <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
                <ContentSearch>
                    <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
                    <div className="flex justify-end">
                        <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Tambah User" className="w-full md:w-auto" />
                    </div>
                </ContentSearch>
                <CustomTable heads={tableHeads}>
                    {isLoading ? (
                        <LoadingTable colSpan={tableHeads.length} />
                    ) : (
                        userPages?.content.map((user, index) => (
                            <tr key={user.id} className="border-b text-center">
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    {getItemNumber(currentPage, index)}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap capitalize">
                                    {user.name}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                                    {user.username}
                                </td>
                                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap capitalize">
                                    {user.role.name}
                                </td>
                                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                                    <CustomDropdown>
                                        <>
                                            <DropdownUpdate onClick={() => handleEditUser(user.id)} />
                                            <DropdownDelete onClick={() => handleDeleteUser(user.id)} />
                                        </>
                                    </CustomDropdown>
                                </td>
                            </tr>
                        ))
                    )}
                </CustomTable>
                <FooterTable totalItem={userPages?.totalItem ?? 0} totalPage={userPages?.totalPage ?? 0} handlePageChange={handlePageChange} />
                {isModalCreateOpen && <UserCreate closeModal={() => setIsModalCreateOpen(false)} fetchApiUserFindAllPagination={fetchApiUserFindAllPagination} />}
                {isModalUpdateOpen && <UserUpdate id={userIdUpdate} closeModal={() => setIsModalUpdateOpen(false)} fetchApiUserFindAllPagination={fetchApiUserFindAllPagination} />}
            </section>
        </div>
    );
}
