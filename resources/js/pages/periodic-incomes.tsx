import ItemTablePeriodic from "@/components/item-table-periodic";
import BrandAnchorPrimaryButton from "@/components/ui/brand-anchor-primarybutton";
import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import WebAppLayout from "@/layouts/webapp-layout";
import SectionDeleteTableRecords from "@/sections/section-deletetablerecords";
import { TableRowPeriodicIncome } from "@/types";
import { useEffect, useState } from "react";

export default function PeriodicIncomes() {

    const [tableresults, settableresults] = useState<TableRowPeriodicIncome[]>([]);
    const [selectionmode, setselectionmode] = useState<boolean>(false);
    const [SelectedRows, setSelectedRows] = useState<number[]>([]);

    useEffect(() => {
        fetch('getperiodicincomes').then((response) => response.json()).then((response) => {
            settableresults(response);
        });
    }, []);

    useEffect(() => {
        setselectionmode(SelectedRows.length > 0);
    }, [SelectedRows]);

    const RenderTableResults = () => {
        if (tableresults.length > 0) {
            return tableresults.map((item, index) => {
                return <><ItemTablePeriodic key={index} index={item.id} item={item} onDoubleClickevent={ShowSelectionMode} selectionmode={selectionmode}></ItemTablePeriodic></>
            })
        }

        return <tr><td className="p-3" colSpan={7}><p>Sin Resultados</p></td></tr>
    }

    function OnDeleteSuccessHandler() {
        const _newarray = [...tableresults].filter(x => !!SelectedRows.find(item2 => x.id != item2));
        settableresults(_newarray);

        setSelectedRows([]);
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

    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <div className="mb-6 flex gap-6">
                        <div>
                            <BrandAnchorSecondaryButton href="ingresos">Regresar</BrandAnchorSecondaryButton>
                        </div>
                        <div>
                            <BrandAnchorPrimaryButton href="nuevoingresoperiodico">Nuevo Ingreso Periodico</BrandAnchorPrimaryButton>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <p className="my-6 text-brand-white">Haz doble click sobre un registro para ver mas acciones</p>
                        <div className="ml-auto" hidden={!selectionmode}>
                            <div className="inline-block">
                                <BrandAnchorPrimaryButton disabled={SelectedRows.length > 1} href={"editaringresoperiodico/" + SelectedRows[0]}>Editar</BrandAnchorPrimaryButton> &nbsp;
                            </div>
                            <div className="inline-block">
                                <SectionDeleteTableRecords hrefdelete="deleteperiodicincome" selectedrows={SelectedRows} onDeleteSuccess={() => { OnDeleteSuccessHandler(); }}></SectionDeleteTableRecords>
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
            </WebAppLayout >
        </>
    )
}