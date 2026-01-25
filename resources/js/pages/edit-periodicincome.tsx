import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import WebAppLayout from "@/layouts/webapp-layout";
import SectionperiodicDetails from "@/sections/section-periodicdetails";
import { FormPeriodicIncomeRecord, SelectAppUserAccountItem, SelectCategoryItem } from "@/types";
import { DatetoYMDTimeFormat } from "@/utils/format";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function EditPeriodicIncome({ preloadeddata }: { preloadeddata: any }) {
    const { data, setData, post, processing, errors } = useForm<FormPeriodicIncomeRecord>({
        '_method': 'PUT',
        'input-concept': preloadeddata.concept,
        'date-date_begin': preloadeddata.date_begin,
        'date-date_end': preloadeddata.date_end ? preloadeddata.date_end : null,
        'input-income_frequency': preloadeddata.income_frequency,
        'input-amount': preloadeddata.amount,
        'checkbox-excludefrom_savingsgoal': preloadeddata.excludefrom_savingsgoal,
        'input-notes': preloadeddata.notes,
        'select-categoryincome_id': preloadeddata.categoryincome_id,
        'select-appuseraccount_id': preloadeddata.appuseraccount_id
    });

    const [listcategoryincome, setlistcategoryincome] = useState<SelectCategoryItem[]>([]);
    const [listappuseraccounts, setlistappuseraccounts] = useState<SelectAppUserAccountItem[]>([]);

    useEffect(() => {
        fetch('/category_income/all').then((response) => response.json()).then((response) => {
            if (response.length > 0) {
                setlistcategoryincome(response);
                setData("select-categoryincome_id", preloadeddata.categoryincome_id);
            }
        });

        fetch('/selectaccounts').then((response) => response.json()).then((response) => {
            if (response.length > 0) {
                setlistappuseraccounts(response);
                setData("select-appuseraccount_id", preloadeddata.appuseraccount_id);
            }
        });
    }, []);

    const OnSubmitHandler = (e: any) => {
        e.preventDefault();
        post('/editaringresoperiodico/' + preloadeddata.id, {
            onSuccess: (response) => {

            },
            onError: (errors) => {

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
                        <h4 className="text-lg font-bold uppercase">Actualizar Ingreso Periodico</h4>
                        <hr className="my-3"></hr>
                        <form onSubmit={OnSubmitHandler} autoComplete="false">
                            <SectionperiodicDetails listcategoryincome={listcategoryincome} listappuseraccounts={listappuseraccounts} data={data} setData={setData}></SectionperiodicDetails>
                            <div className="flex justify-end gap-3">
                                <BrandAnchorSecondaryButton href="/ingresosperiodicos">Cancelar</BrandAnchorSecondaryButton>
                                <BrandButtonPrimary disabled={processing}>Actualizar</BrandButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}