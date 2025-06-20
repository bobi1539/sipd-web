export interface PaginationResponse<T> {
    data: T[];
    pageNumber: number;
    pageSize: number;
    totalItem: number;
    totalPage: number;
}
