export interface Search {
    value?: string | null;
    isDeleted?: boolean | null;
    page?: number | null;
    size?: number | null;
}

export const buildSearch = (value: string | null, isDeleted?: boolean | null, page?: number | null, size?: number | null): Search => {
    return {
        value: value,
        isDeleted: isDeleted,
        page: page,
        size: size,
    };
};
