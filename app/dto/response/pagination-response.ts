export interface PaginationResponse<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalItem: number;
    totalPage: number;
    totalElements: number;
    totalPages: number;
}
