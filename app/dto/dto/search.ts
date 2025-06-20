export interface Search {
    value?: string;
}

export const buildSearch = (value: string): Search => {
    return {
        value: value,
    };
};
