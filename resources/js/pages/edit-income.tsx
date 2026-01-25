import WebAppLayout from "@/layouts/webapp-layout";
import { useForm } from "@inertiajs/react";
import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import BrandInputForm from "@/components/ui/brand-input-form";
import BrandSelectForm from "@/components/ui/brand-select-form";
import { useEffect, useState } from "react";
import { FormIncomeRecord, SelectAppUserAccountItem, SelectCategoryItem, SelectPeriodicExpenseItem } from "@/types";
import BrandInputCheckboxForm from "@/components/ui/brand-input-checkbox-form";
import { DatetoYMDFormat, DatetoYMDTimeFormat } from "@/utils/format";
import BrandTextAreaForm from "@/components/ui/brand-textarea-form";
import SectionNewIncomeDetails from "@/sections/section-newincome-details";

export default function EditIncome({ preloadeddata }: { preloadeddata: any }) {

    const { data, setData, post, processing, errors } = useForm<FormIncomeRecord>({
        '_method': 'PUT',
        'input-concept': '',
        'input-date': DatetoYMDTimeFormat(new Date()),
        'input-amount': 0,
        'checkbox-excludefrom_savingsgoal': false,
        'input-notes': '',
        'select-categoryincome_id': '',
        'select-periodicincome_id': '',
        'select-appuseraccount_id': ''
    })

    const [listcategoryincome, setlistcategoryincome] = useState<SelectCategoryItem[]>([]);
    const [listappuseraccounts, setlistappuseraccounts] = useState<SelectAppUserAccountItem[]>([]);
    const [listperiodicincomes, setlistperiodicincomes] = useState<SelectPeriodicExpenseItem[]>([]);

    useEffect(() => {
        fetch('/category_income/all').then((response) => response.json()).then((response) => {
            if (response.length > 0)
                setlistcategoryincome(response);
            setData("select-categoryincome_id", preloadeddata.categoryincome_id);
        });

        fetch('/selectaccounts').then((response) => response.json()).then((response) => {
            if (response.length > 0) {
                setlistappuseraccounts(response);
                setData("select-appuseraccount_id", preloadeddata.appuseraccount_id);
            }
        });

        fetch('/selectperiodicincomes').then((response) => response.json()).then((response) => {
            if (response.length > 0) {
                let _options = [{
                    "id": 0, "name": "-- No usar Plantilla --", amount: 0, appuseraccount_id: 0, categoryexpense_id: 0, excludefrom_savingsgoal: false, notes: "",
                }];
                _options.push(...response);

                setlistperiodicincomes(response);
                setData("select-periodicincome_id", "1");
            }
        });
    }, []);

    function FillFieldwithPeriodicExpenseTemplate(index: number) {
        if (index == 0) {
            setData("input-concept", "");
            setData("input-amount", 0);
            setData("input-notes", "");
            setData("select-appuseraccount_id", listappuseraccounts[0].id.toString());
            setData("select-categoryincome_id", listcategoryincome[0].id.toString());
            setData("checkbox-excludefrom_savingsgoal", false);
        } else {
            setData("input-concept", listperiodicincomes[index].name);
            setData("input-amount", listperiodicincomes[index].amount);
            setData("input-notes", listperiodicincomes[index].notes || "");
            setData("select-appuseraccount_id", listperiodicincomes[index].appuseraccount_id.toString());
            setData("select-categoryincome_id", listcategoryincome[index].id.toString());
            setData("checkbox-excludefrom_savingsgoal", listperiodicincomes[index].excludefrom_savingsgoal);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        post('/editaringreso/' + preloadeddata.id, {
            onSuccess: (result) => {
                console.log(result);
            },
            onError: (error) => {
                console.log(error);
            },
            onFinish: () => {

            }
        });
    }

    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <div className="bg-brand-white rounded-md p-12">
                        <h4 className="text-lg font-bold uppercase">Actualizar Ingreso</h4>
                        <hr className="my-3"></hr>
                        <form onSubmit={handleSubmit} autoComplete="false">
                            <SectionNewIncomeDetails listcategoryincome={listcategoryincome} listperiodicincomes={listperiodicincomes} listappuseraccounts={listappuseraccounts} data={data} setData={setData} FillFieldwithPeriodicExpenseTemplate={FillFieldwithPeriodicExpenseTemplate}></SectionNewIncomeDetails>
                            <div className="flex justify-end gap-3">
                                <BrandAnchorSecondaryButton href="/ingresos">Cancelar</BrandAnchorSecondaryButton>
                                <BrandButtonPrimary disabled={processing}>Agregar</BrandButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}