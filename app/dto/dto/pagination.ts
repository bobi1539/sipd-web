import { DEFAULT_PAGE_SIZE } from "@/app/constant/general";

export interface Pagination {
    pageNumber: number;
    pageSize: number;
}

export const paginationDefault = (pageNumber: number): Pagination => {
    return {
        pageNumber: pageNumber,
        pageSize: DEFAULT_PAGE_SIZE,
    };
};
