import { Option } from "../dto/input-select-option";

export interface CityResponse {
    id: number;
    name: string;
}

export const citiesResponseToOptions = (cities: CityResponse[]): Option[] => {
    return cities.map((city) => ({
        value: city.id.toString(),
        label: city.name,
    }));
};
