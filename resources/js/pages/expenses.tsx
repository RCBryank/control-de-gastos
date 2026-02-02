import ItemTable from "@/components/item-table";
import ExpenseItemTable from "@/components/item-table";
import BrandAnchorButtonNewExpense from "@/components/ui/brand-anchor-button-newexpense";
import BrandAnchorPrimaryButton from "@/components/ui/brand-anchor-primarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import BrandButtonSecondary from "@/components/ui/brand-button-secondary";
import BrandDateRangeForm from "@/components/ui/brand-date-range-form";
import BrandInputForm from "@/components/ui/brand-input-form";
import BrandNumberRangeForm from "@/components/ui/brand-number-range-form";
import BrandSelectForm from "@/components/ui/brand-select-form";
import WebAppLayout from "@/layouts/webapp-layout";
import { FiltersFields, SelectAppUserAccountItem, SelectCategoryItem, TableRowItem } from "@/types";
import { DatetoYMDFormat } from "@/utils/format";
import { useEffect, useState } from "react";

export default function Expenses() {

    const [tableresults, settableresults] = useState<TableRowItem[]>([]);
    const [listcategoryexpense, setlistcategoryexpense] = useState<SelectCategoryItem[]>([]);
    const [listappuseraccounts, setlistappuseraccounts] = useState<SelectAppUserAccountItem[]>([]);
    const [selectionmode, setselectionmode] = useState(false);
    const [SelectedRows, setSelectedRows] = useState<number[]>([]);

    const [filters, setfilters] = useState<FiltersFields>({
        concept: '',
        categoryrecord_id: '0',
        appuseraccount_id: '0',
        min: '0',
        max: '0',
        date_begin: DatetoYMDFormat(new Date()),
        date_end: DatetoYMDFormat(new Date())
    });

    useEffect(() => {
        SearchFilterResults();

        fetch('category_expense/all').then((response) => response.json()).then((response) => {
            let options = [{ "id": 0, "name": "Cualquiera" }];

            if (response.length > 0) {
                options.push(...response);
            }
            setlistcategoryexpense(options);
        });

        fetch('selectaccounts').then((response) => response.json()).then((response) => {
            let options = [{ "id": 0, "name": "Todas" }];

            if (response.length > 0) {
                options.push(...response);
            }
            setlistappuseraccounts(options);
        });
    }, []);

    useEffect(() => {
        setselectionmode(SelectedRows.length > 0);
    }, [SelectedRows]);

    function SearchFilterResults() {
        const params = new URLSearchParams({
            concept: filters.concept,
            categoryrecord_id: filters.categoryrecord_id,
            appuseraccount_id: filters.appuseraccount_id,
            min: filters.min,
            max: filters.max,
            date_begin: filters.date_begin,
            date_end: filters.date_end
        });

        fetch("gastos/find?" + params.toString()).then((response) => response.json()).then((response) => {
            settableresults(response);
        });
    }

    function ShowSelectionMode(index: number, selected: boolean) {
        if (selected) {
            const _newlist = [...SelectedRows];
            _newlist.push(index);
            console.log(_newlist.length);
            setSelectedRows(_newlist);
        } else {
            setSelectedRows(SelectedRows.filter(x => x != index));
        }
    }

    const RenderTableResults = () => {
        if (tableresults.length > 0) {
            return tableresults.map((result) => {
                return <ItemTable key={result.id} index={result.id} props={result} onDoubleClickevent={ShowSelectionMode} selectionmode={selectionmode}></ItemTable>
            });
        }

        return <tr><td className="p-3" colSpan={7}><p>Sin Resultados</p></td></tr>
    }

    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <div className="mb-6 flex gap-6">
                        <div>
                            <BrandAnchorButtonNewExpense href="nuevogasto">Nuevo Gasto</BrandAnchorButtonNewExpense>
                        </div>
                        <div>
                            <BrandAnchorButtonNewExpense href="gastosperiodicos">Gastos Periodicos</BrandAnchorButtonNewExpense>
                        </div>
                    </div>
                    <div className="p-4 mb-6 bg-brand-white rounded-md">
                        <div className="flex gap-6 mb-4">
                            <div className="grow-0">
                                <BrandInputForm onChange={(e) => setfilters({ ...filters, concept: e.currentTarget.value })}>Concepto</BrandInputForm>
                            </div>
                            <div className="flex-1/6 grow-0">
                                <BrandSelectForm label="Categoria" defaultValue={0} onChange={(e) => { setfilters({ ...filters, categoryrecord_id: e.currentTarget.value }) }}>
                                    {listcategoryexpense.map(function (item, index) {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })}
                                </BrandSelectForm>
                            </div>
                            <div className="flex-1/6 grow-0">
                                <BrandSelectForm label="Cuenta" defaultValue={0} onChange={(e) => { setfilters({ ...filters, appuseraccount_id: e.currentTarget.value }) }}>
                                    {listappuseraccounts.map(function (item, index) {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })}
                                </BrandSelectForm>
                            </div>
                            <div className="flex-1/6 grow-0">
                                <BrandNumberRangeForm min={0} max={0} onChangeEvent={(smin: string, smax: string) => { setfilters({ ...filters, min: smin, max: smax }) }}>Rango de Monto</BrandNumberRangeForm>
                            </div>
                            <div>
                                <BrandDateRangeForm defaultmin={new Date()} defaultmax={new Date()} onChangeEvent={(datemin: Date, datemax: Date) => { setfilters({ ...filters, date_begin: DatetoYMDFormat(datemin), date_end: DatetoYMDFormat(datemax) }) }}>Entre fechas</BrandDateRangeForm>
                            </div>
                        </div>
                        <div className="text-end">
                            <BrandButtonPrimary onClick={SearchFilterResults}>Buscar</BrandButtonPrimary>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <p className="my-6 text-brand-white">Haz doble click sobre un registro para ver mas acciones</p>
                        <div className="ml-auto" hidden={!selectionmode}>
                            <BrandButtonPrimary disabled={SelectedRows.length > 1}>Editar</BrandButtonPrimary> &nbsp;
                            <BrandButtonSecondary>Eliminar</BrandButtonSecondary>
                        </div>
                    </div>
                    <div>
                        <table className="w-full bg-brand-white rounded-md overflow-hidden">
                            <thead className="bg-brand-green text-white">
                                <tr>
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">Concepto</th>
                                    <th className="p-3 text-left">Descripción</th>
                                    <th className="p-3 text-left">Categoria</th>
                                    <th className="p-3 text-left">Cuenta</th>
                                    <th className="p-3 text-center">Monto</th>
                                    <th className="p-3 text-center">Fecha</th>
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