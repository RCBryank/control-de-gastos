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
        categoryexpense_id: '',
        appuseraccount_id: '',
        min: '',
        max: '',
        date_begin: '',
        date_end: ''
    });

    useEffect(() => {
        SearchFilterResults();

        fetch('category_expense/all').then((response) => response.json()).then((response) => {
            if (response.length > 0)
                setlistcategoryexpense(response);
        });

        fetch('selectaccounts').then((response) => response.json()).then((response) => {
            if (response.length > 0)
                setlistappuseraccounts(response);
        });
    }, []);

    function SearchFilterResults() {
        const params = new URLSearchParams({
            concept: filters.concept,
            categoryexpense_id: filters.appuseraccount_id,
            appuseraccount_id: filters.appuseraccount_id,
            min: filters.min,
            max: filters.max,
            begindate: filters.date_begin,
            enddate: filters.date_end
        });

        fetch("gastos/find?" + params.toString()).then((response) => response.json()).then((response) => {
            settableresults(response);
        });
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
                                <BrandSelectForm label="Categoria" onChange={(e) => { setfilters({ ...filters, categoryexpense_id: e.currentTarget.value }) }}>
                                    {listcategoryexpense.map(function (item, index) {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })}
                                </BrandSelectForm>
                            </div>
                            <div className="flex-1/6 grow-0">
                                <BrandSelectForm label="Cuenta" onChange={(e) => { setfilters({ ...filters, appuseraccount_id: e.currentTarget.value }) }}>
                                    {listappuseraccounts.map(function (item, index) {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })}
                                </BrandSelectForm>
                            </div>
                            <div className="flex-1/6 grow-0">
                                <BrandNumberRangeForm min={0} max={0}>Rango de Monto</BrandNumberRangeForm>
                            </div>
                            <div>
                                <BrandDateRangeForm>Entre fechas</BrandDateRangeForm>
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
                                {
                                    tableresults.map(function (result, index) {
                                        return <ExpenseItemTable key={result.id} props={result}></ExpenseItemTable>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}