import { TableRowPeriodicRecord } from "@/types";
import { NumbertoFormatCurrency, YMDToNormalFormat } from "@/utils/format";
import { useEffect, useState } from "react";

export default function ItemTablePeriodic({ index, item, onDoubleClickevent, selectionmode }: { index: number, item: TableRowPeriodicRecord, onDoubleClickevent: Function, selectionmode: boolean }) {

    const [selected, setselected] = useState<boolean>(false);

    useEffect(() => {
        onDoubleClickevent(index, selected);
    }, [selected]);

    function onDoubleClickHandler() {
        setselected(!selected);
    }

    const ShowEditMode = () => {
        if (selectionmode) {
            return <input type="checkbox" checked={selected} onChange={() => { setselected(!selected) }} />
        } else {
            return item.id
        }
    }

    return (
        <>
            <tr key={index} onDoubleClick={onDoubleClickHandler} className={"cursor-pointer " +( selected ? "bg-brand-table-selected-row" : "")}>
                <td className="p-3">{ShowEditMode()}</td>
                <td className="p-3">{item.concept}</td>
                <td className="p-3">{YMDToNormalFormat(item.date_begin)}</td>
                <td className="p-3">{item.date_end}</td>
                <td className="p-3 text-center">{item.frequency}</td>
                <td className="p-3 text-end">{NumbertoFormatCurrency(item.amount)}</td>
                <td className="p-3 text-center">{item.excludefrom_savingsgoal ? "Excluir" : ""}</td>
                <td className="p-3">{item.category_name}</td>
            </tr>
        </>
    )
}