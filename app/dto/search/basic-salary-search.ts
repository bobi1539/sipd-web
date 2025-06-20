import { Search } from "../dto/search";

export interface BasicSalarySearch extends Search {
    positionId: number;
}

export const buildBasicSalarySearch = (positionId: number): BasicSalarySearch => {
    return {
        positionId: positionId,
    };
};
