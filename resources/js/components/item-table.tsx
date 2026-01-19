import { TableRowItem } from "@/types";
import { DatetoYMDFormat, NumbertoFormatCurrency, StringFullDatetoNormalFormat } from "@/utils/format";
import { useEffect, useState } from "react";

export default function ItemTable({ index, props, onDoubleClickevent, selectionmode }: { index: number, props: TableRowItem, onDoubleClickevent: Function, selectionmode: boolean }) {

    const [selected, setselected] = useState(false);

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
            return props.id
        }
    }

    return (
        <>
            <tr onDoubleClick={onDoubleClickHandler}>
                <td className="p-3">{ShowEditMode()}</td>
                <td className="p-3">{props.concept}</td>
                <td className="p-3">{props.notes}</td>
                <td className="p-3">{props.categoryname}</td>
                <td className="p-3">{props.name}</td>
                <td className="p-3 text-end">{NumbertoFormatCurrency(props.amount)}</td>
                <td className="p-3 text-end">{StringFullDatetoNormalFormat(props.record_date)}</td>
            </tr>
        </>
    )
}