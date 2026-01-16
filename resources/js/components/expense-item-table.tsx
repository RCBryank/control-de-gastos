import { TableRowExpenseItem } from "@/types";
import { DatetoYMDFormat, NumbertoFormatCurrency, StringFullDatetoNormalFormat } from "@/utils/format";

export default function ExpenseItemTable({ props }: { props: TableRowExpenseItem }) {
    return (
        <>
            <tr>
                <td className="p-3">{props.id}</td>
                <td className="p-3">{props.concept}</td>
                <td className="p-3">{props.notes}</td>
                <td className="p-3">{props.categoryname}</td>
                <td className="p-3">{props.name}</td>
                <td className="p-3 text-end">{NumbertoFormatCurrency(props.amount)}</td>
                <td className="p-3 text-end">{StringFullDatetoNormalFormat(props.expenserecord_date)}</td>
            </tr>
        </>
    )
}