import Spinner from "../spinner/spinner";

interface LoadingTableProps {
    colSpan: number;
}

export default function LoadingTable(props: Readonly<LoadingTableProps>) {
    return (
        <tr className="h-32">
            <td colSpan={props.colSpan}>
                <div className="flex justify-center items-center">
                    <Spinner />
                </div>
            </td>
        </tr>
    );
}
