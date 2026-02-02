import AppMessageFormResult from "@/components/app-messageformresult";
import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import WebAppLayout from "@/layouts/webapp-layout";
import SectionperiodicDetails from "@/sections/section-periodicdetails";
import SectionPeriodicExpenseDetails from "@/sections/section-periodicexpensedetails";
import { FormPeriodicExpenseRecord, HttpRequestResponse, SelectAppUserAccountItem, SelectCategoryItem } from "@/types";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function EditPeriodicExpense({ preloadeddata }: { preloadeddata: any }) {

    const { data, setData, post, processing, errors } = useForm<FormPeriodicExpenseRecord>({
        '_method': 'PUT',
        'input-concept': preloadeddata.concept,
        'date-date_begin': preloadeddata.date_begin,
        'date-date_end': preloadeddata.date_end ? preloadeddata.date_end : null,
        'input-billing_frequency': preloadeddata.billing_frequency,
        'input-amount': preloadeddata.amount,
        'checkbox-excludefrom_savingsgoal': preloadeddata.excludefrom_savingsgoal,
        'input-notes': preloadeddata.notes,
        'select-categoryexpense_id': preloadeddata.categoryincome_id,
        'select-appuseraccount_id': preloadeddata.appuseraccount_id
    });

    const [listcategoryexpense, setlistcategoryexpense] = useState<SelectCategoryItem[]>([]);
    const [listappuseraccounts, setlistappuseraccounts] = useState<SelectAppUserAccountItem[]>([]);
    const [formsuccess, setformsuccess] = useState<boolean>();

    useEffect(() => {
        fetch('/category_expense/all').then((response) => response.json()).then((response) => {
            if (response.length > 0) {
                setlistcategoryexpense(response);
                setData("select-categoryexpense_id", preloadeddata.categoryexpense_id);
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
        post('/editargastoperiodico/' + preloadeddata.id, {
            onSuccess: (response: any) => {
                setformsuccess(true);
            },
            onError: (response: any) => {
                setformsuccess(false);
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
                        <h4 className="text-lg font-bold uppercase">Actualizar Gasto Periodico</h4>
                        <hr className="my-3"></hr>
                        <form onSubmit={OnSubmitHandler} autoComplete="false">
                            <SectionPeriodicExpenseDetails listcategoryexpense={listcategoryexpense} listappuseraccounts={listappuseraccounts} data={data} setData={setData}></SectionPeriodicExpenseDetails>
                            <AppMessageFormResult formResult={formsuccess} errors={errors} errormessage="Ha ocurrido un error" successmessage="Se ha actualizado con exito el registro"></AppMessageFormResult>
                            <div className="flex justify-end gap-3">
                                <BrandAnchorSecondaryButton href="/gastosperiodicos">Cancelar</BrandAnchorSecondaryButton>
                                <BrandButtonPrimary disabled={processing}>Actualizar</BrandButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}