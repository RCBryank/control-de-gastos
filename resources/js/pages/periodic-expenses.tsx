import ItemTablePeriodic from "@/components/item-table-periodic";
import BrandAnchorPrimaryButton from "@/components/ui/brand-anchor-primarybutton";
import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import WebAppLayout from "@/layouts/webapp-layout";
import SectionDeleteTableRecords from "@/sections/section-deletetablerecords";
import SectionNextPeriodicRecords from "@/sections/section-nextperiodicrecords";
import { TableRowPeriodicRecord } from "@/types";
import { useEffect, useState } from "react";

export default function PeriodicExpenses() {

    const [tableresults, settableresults] = useState<TableRowPeriodicRecord[]>([]);
    const [selectionmode, setselectionmode] = useState<boolean>(false);
    const [SelectedRows, setSelectedRows] = useState<number[]>([]);

    useEffect(() => {
        fetch("getperiodicexpenses").then((response) => response.json()).then((response) => {
            settableresults(response);
        });

        fetch("nextperiodicexpenses").then((response) => response.json()).then((response) => {
            
        });
    }, []);

    useEffect(() => {
        setselectionmode(SelectedRows.length > 0);
    }, [SelectedRows]);

    const RenderTableResults = () => {
        return tableresults.map(function (ritem, index) {
            return <ItemTablePeriodic index={ritem.id} key={ritem.id} item={ritem} onDoubleClickevent={ShowSelectionMode} selectionmode={selectionmode}></ItemTablePeriodic>
        })
    }

    function ShowSelectionMode(index: number, selected: boolean) {
        if (selected) {
            const _newlist = [...SelectedRows];
            _newlist.push(index);
            setSelectedRows(_newlist);
        } else {
            setSelectedRows(SelectedRows.filter(x => x != index));
        }
    }

    function OnDeleteSuccessHandler() {
        const _newarray = [...tableresults].filter(x => !!SelectedRows.find(item2 => x.id != item2));
        settableresults(_newarray);

        setSelectedRows([]);
    }

    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <div className="mb-12 flex gap-6">
                        <div>
                            <BrandAnchorSecondaryButton href="gastos">Regresar</BrandAnchorSecondaryButton>
                        </div>
                        <div>
                            <BrandAnchorPrimaryButton href="nuevogastoperiodico">Nuevo Gasto Periodico</BrandAnchorPrimaryButton>
                        </div>
                    </div>
                    <div className="mb-12">
                        <SectionNextPeriodicRecords href="nextperiodicexpenses">Próximos gastos programados</SectionNextPeriodicRecords>
                    </div>
                    <div className="flex gap-6 min-h-18">
                        <p className="mb-6 text-brand-white">Haz doble click sobre un registro para ver mas acciones</p>
                        <div className="ml-auto">
                            <div className={"flex gap-4 " + (selectionmode ? "visible" : "hidden")}>
                                <BrandAnchorPrimaryButton disabled={SelectedRows.length > 1} href={"editargastoperiodico/" + SelectedRows[0]}>Editar</BrandAnchorPrimaryButton>
                                <SectionDeleteTableRecords hrefdelete="deleteperiodicexpense" selectedrows={SelectedRows} onDeleteSuccess={() => { OnDeleteSuccessHandler(); }}></SectionDeleteTableRecords>
                            </div>
                        </div>
                    </div>
                    <div>
                        <table className="w-full bg-brand-white rounded-md overflow-hidden">
                            <thead className="bg-brand-green text-white">
                                <tr>
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">Concepto</th>
                                    <th className="p-3 text-left">Fecha de Inicio</th>
                                    <th className="p-3 text-left">Fecha Final</th>
                                    <th className="p-3 text-left">Dias de Frecuencia</th>
                                    <th className="p-3 ">Cantidad</th>
                                    <th className="p-3 ">Excluir de meta de ahorro</th>
                                    <th className="p-3 text-left">Categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RenderTableResults()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}