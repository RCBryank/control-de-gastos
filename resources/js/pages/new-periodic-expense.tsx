import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import BrandDateRangeForm from "@/components/ui/brand-date-range-form";
import BrandInputCheckboxForm from "@/components/ui/brand-input-checkbox-form";
import BrandInputForm from "@/components/ui/brand-input-form";
import BrandSelectForm from "@/components/ui/brand-select-form";
import BrandTextAreaForm from "@/components/ui/brand-textarea-form";
import WebAppLayout from "@/layouts/webapp-layout";
import { SelectAppUserAccountItem, SelectCategoryItem } from "@/types";
import { DatetoYMDFormat } from "@/utils/format";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function NewPeriodicExpense() {

    const { data, setData, post, processing, errors } = useForm({
        "input-concept": '',
        "input-amount": 0,
        "select-appuseraccount_id": '',
        "select-categoryexpense_id": '',
        "input-billing_frequency": 1,
        "date-date_begin": DatetoYMDFormat(new Date()),
        "date-date_end": '',
        "checkbox-excludefrom_savingsgoal": false,
        "input-notes": ''
    });

    const [listcategoryexpense, setlistcategoryexpense] = useState<SelectCategoryItem[]>([]);
    const [listappuseraccounts, setlistappuseraccounts] = useState<SelectAppUserAccountItem[]>([]);

    useEffect(() => {
        fetch('category_expense/all').then((response) => response.json()).then((response) => {
            if (response.length > 0)
                setlistcategoryexpense(response);
            setData("select-categoryexpense_id", response[0].id);
        });

        fetch('selectaccounts').then((response) => response.json()).then((response) => {
            if (response.length > 0) {
                setlistappuseraccounts(response);
                setData("select-appuseraccount_id", response[0].id);
            }
        });

    }, []);

    const onSubmitHandler = (e: any) => {
        e.preventDefault();

        post("nuevogastoperiodico", {
            onSuccess: (response) => {

            },
            onError: (error) => {

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
                        <h4 className="text-lg font-bold uppercase">Nuevo Gasto Periodico</h4>
                        <hr className="my-3"></hr>
                        <h5 className="text-lg mb-2">Detalles</h5>
                        <form onSubmit={onSubmitHandler} autoComplete="false">
                            <div className="flex gap-6 mb-4">
                                <div className="flex-1/3 grow-0">
                                    <BrandInputForm name="input-concept" onChange={(e) => setData("input-concept", e.currentTarget.value)}>Concepto</BrandInputForm>
                                </div>
                                <div>
                                    <BrandInputForm name="input-amount" onChange={(e) => setData("input-amount", (parseFloat(e.currentTarget.value)) as number)} type="number">Monto</BrandInputForm>
                                </div>
                                <div>
                                    <BrandSelectForm label="Cuenta" name="select-appuseraccount_id" onChange={(e) => { setData("select-appuseraccount_id", e.currentTarget.value) }} >
                                        {listappuseraccounts.map(function (item, index) {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </BrandSelectForm>
                                </div>
                                <div>
                                    <BrandInputForm type="number" onChange={(e) => { setData("input-billing_frequency", parseFloat(e.currentTarget.value)) }} defaultValue={1}>Dias de Frecuencia</BrandInputForm>
                                </div>
                                <div className="flex-auto ml-auto grow-0">
                                    <BrandInputCheckboxForm name="checkbox-excludefrom_savingsgoal" customOnChangeEvent={(value: boolean) => setData("checkbox-excludefrom_savingsgoal", value)} propdivisChecked={false}>Excluir de Meta de Ahorro</BrandInputCheckboxForm>
                                </div>
                            </div>
                            <div className="flex gap-6 mb-4">
                                <div>
                                    <BrandInputForm type="date" className="inline-block" defaultValue={DatetoYMDFormat(new Date())} onChange={(e) => setData("date-date_begin", e.currentTarget.value)}>Empezando esta fecha</BrandInputForm>
                                </div>
                                <div>
                                    <BrandInputForm type="date" className="inline-block" onChange={(e) => setData("date-date_end", e.currentTarget.value)}>Hasta esta fecha</BrandInputForm>
                                </div>
                                <div>
                                    <BrandSelectForm label="Categoria" name="select-categoryexpense_id" onChange={(e) => { setData("select-categoryexpense_id", e.currentTarget.value) }}>
                                        {listcategoryexpense.map(function (item, index) {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </BrandSelectForm>
                                </div>
                            </div>
                            <div className="mb-4">
                                <BrandTextAreaForm name="input-notes" onChange={(e) => { setData("input-notes", e.currentTarget.value) }}>Notas</BrandTextAreaForm>
                            </div>
                            <div className="flex justify-end gap-3">
                                <BrandAnchorSecondaryButton href="/gastosperiodicos">Cancelar</BrandAnchorSecondaryButton>
                                <BrandButtonPrimary disabled={processing}>Agregar</BrandButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}