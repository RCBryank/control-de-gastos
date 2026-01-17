import ExpenseItemTable from "@/components/expense-item-table";
import BrandAnchorButtonNewExpense from "@/components/ui/brand-anchor-button-newexpense";
import BrandAnchorPrimaryButton from "@/components/ui/brand-anchor-primarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import BrandDateRangeForm from "@/components/ui/brand-date-range-form";
import BrandInputForm from "@/components/ui/brand-input-form";
import BrandNumberRangeForm from "@/components/ui/brand-number-range-form";
import BrandSelectForm from "@/components/ui/brand-select-form";
import WebAppLayout from "@/layouts/webapp-layout";
import { SelectAppUserAccountItem, SelectCategoryItem, TableRowExpenseItem } from "@/types";
import { DatetoYMDFormat } from "@/utils/format";
import { useEffect, useState } from "react";

interface FiltersFields {
    concept: string,
    categoryexpense_id: string,
    appuseraccount_id: string,
    min: string,
    max: string,
    date_begin: string,
    date_end: string
}

export default function Expenses() {

    const [tableresults, settableresults] = useState<TableRowExpenseItem[]>([]);
    const [listcategoryexpense, setlistcategoryexpense] = useState<SelectCategoryItem[]>([]);
    const [listappuseraccounts, setlistappuseraccounts] = useState<SelectAppUserAccountItem[]>([]);

    const [filters, setfilters] = useState<FiltersFields>({
        concept: '',
        categoryexpense_id: '0',
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

    function SearchFilterResults() {
        const params = new URLSearchParams({
            concept: filters.concept,
            categoryexpense_id: filters.categoryexpense_id,
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

    const RenderTableResults = () => {
        if (tableresults.length > 0) {
            return tableresults.map((result) => {
                return <ExpenseItemTable key={result.id} props={result}></ExpenseItemTable>
            });
        }

        return <tr><td className="p-3" colSpan={7}><p>Sin Resultados</p></td></tr>
    }

    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <div className="mb-6">
                        <BrandAnchorButtonNewExpense href="nuevogasto">Nuevo Gasto</BrandAnchorButtonNewExpense>
                    </div>
                    <div className="p-4 mb-6 bg-brand-white rounded-md">
                        <div className="flex gap-6 mb-4">
                            <div className="grow-0">
                                <BrandInputForm onChange={(e) => setfilters({ ...filters, concept: e.currentTarget.value })}>Concepto</BrandInputForm>
                            </div>
                            <div className="flex-1/6 grow-0">
                                <BrandSelectForm label="Categoria" defaultValue={0} onChange={(e) => { setfilters({ ...filters, categoryexpense_id: e.currentTarget.value }) }}>
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