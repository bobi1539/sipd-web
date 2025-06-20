import { Pagination } from "@nextui-org/pagination";

interface PaginationTableProps {
    totalPage: number;
    handlePageChange: (pageNumber: number) => void;
}

export default function PaginationTable(props: Readonly<PaginationTableProps>) {
    return (
        <Pagination
            isCompact
            showControls
            total={props.totalPage}
            initialPage={1}
            onChange={props.handlePageChange}
            classNames={{
                wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
                item: "w-8 h-8 text-sm text-primary-700 font-medium rounded-none bg-transparent hover:text-white hover:bg-primary-700 transition duration-200",
                cursor: "w-8 h-8 text-white font-bold bg-primary-700 rounded-none",
                prev: "text-primary-700 w-8 h-8 hover:text-white hover:bg-primary-700 transition duration-200",
                next: "text-primary-700 w-8 h-8 hover:text-white hover:bg-primary-700 transition duration-200",
                chevronNext: "rotate-180",
            }}
        />
    );
}
