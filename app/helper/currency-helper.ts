export const formatNumberToRupiah = (value: number | null | undefined): string => {
    value ??= 0;
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
};
