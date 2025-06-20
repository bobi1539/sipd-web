import { Search } from "../dto/search";

export interface AllowanceSearch extends Search {
    positionId: number;
}

export const buildAllowanceSearch = (positionId: number): AllowanceSearch => {
    return {
        positionId: positionId,
    };
};
