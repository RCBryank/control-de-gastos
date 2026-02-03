import ItemTableSavingGoal from "@/components/item-table-savinggoal";
import WebAppLayout from "@/layouts/webapp-layout";
import { TableRowItemSavingGoal } from "@/types";
import { NumbertoFormatCurrency, YMDToNormalFormat } from "@/utils/format";
import { useEffect, useState } from "react";

export default function SavingsGoal() {

    const [savinggoals, setsavinggoals] = useState<TableRowItemSavingGoal[]>([]);

    useEffect(() => {
        fetch('/savinggoals').then((response) => response.json()).then((response) => {
            setsavinggoals(response);
        });
    }, []);

    const RenderTableResults = () => {
        return savinggoals.map(function (item, index) {
            return <ItemTableSavingGoal item={item} key={item.id}></ItemTableSavingGoal>
        })
    }

    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <table className="w-full bg-brand-white rounded-md overflow-hidden">
                        <thead className="bg-brand-green text-white">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Meta de Ahorro</th>
                                <th className="p-3 text-left">Cuenta</th>
                                <th className="p-3 text-left">Monto Objetivo</th>
                                <th className="p-3 text-left">Fecha de Inicio</th>
                                <th className="p-3 text-left">Fecha de Expiración</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RenderTableResults()}
                        </tbody>
                    </table>
                </div>
            </WebAppLayout>
        </>
    )
}