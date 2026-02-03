import { TableRowItemSavingGoal } from "@/types";
import { NumbertoFormatCurrency, YMDToNormalFormat } from "@/utils/format";

export default function ItemTableSavingGoal({ item }: { item: TableRowItemSavingGoal }) {
    return <tr><td className="p-4">{item.id}</td><td className="p-4">{item.name}</td><td className="p-4">{item.appuseraccount_name}</td><td className="p-4">{NumbertoFormatCurrency(item.target_amount)}</td><td className="p-4">{YMDToNormalFormat(item.date_begin)}</td><td className="p-4">{YMDToNormalFormat(item.date_end)}</td></tr>
}