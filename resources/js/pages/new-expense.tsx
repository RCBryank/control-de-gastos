import WebAppLayout from "@/layouts/webapp-layout";
import { useForm } from "@inertiajs/react";
import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import BrandInputForm from "@/components/ui/brand-input-form";
import BrandSelectForm from "@/components/ui/brand-select-form";
import { useEffect, useState } from "react";
import { SelectAppUserAccountItem, SelectCategoryItem, SelectPeriodicExpenseItem } from "@/types";
import BrandInputCheckboxForm from "@/components/ui/brand-input-checkbox-form";
import { DatetoYMDFormat, DatetoYMDTimeFormat } from "@/utils/format";
import BrandTextAreaForm from "@/components/ui/brand-textarea-form";

export default function NewExpense() {

    //-TODO. Cambiar el input date por un input datetime

    const { data, setData, post, processing, errors } = useForm({
        'input-concept': '',
        'input-date': DatetoYMDTimeFormat(new Date()),
        'input-amount': 0,
        'checkbox-excludefrom_savingsgoal': false,
        'input-notes': '',
        'select-categoryexpense_id': '',
        'select-periodicexpense_id': '',
        'select-appuseraccount_id': ''
    })

    const [listcategoryexpense, setlistcategoryexpense] = useState<SelectCategoryItem[]>([]);
    const [listappuseraccounts, setlistappuseraccounts] = useState<SelectAppUserAccountItem[]>([]);
    const [listperiodicexpenses, setlistperiodicexpenses] = useState<SelectPeriodicExpenseItem[]>([]);

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

        fetch('selectperiodicexpenses').then((response) => response.json()).then((response) => {
            if (response.length > 0) {
                let _options = [{
                    "id": 0, "name": "-- No usar Plantilla --", amount: 0, appuseraccount_id: 0, categoryexpense_id: 0, excludefrom_savingsgoal: false, notes: "",
                }];
                _options.push(...response);

                setlistperiodicexpenses(_options);
                setData("select-periodicexpense_id", _options[0].id.toString());
            }
        });
    }, []);

    function FillFieldwithPeriodicExpenseTemplate(index: number) {
        if (index == 0) {
            setData("input-concept", "");
            setData("input-amount", 0);
            setData("input-notes", "");
            setData("select-appuseraccount_id", listappuseraccounts[0].id.toString());
            setData("select-categoryexpense_id", listcategoryexpense[0].id.toString());
            setData("checkbox-excludefrom_savingsgoal", false);
        } else {
            setData("input-concept", listperiodicexpenses[index].name);
            setData("input-amount", listperiodicexpenses[index].amount);
            setData("input-notes", listperiodicexpenses[index].notes || "");
            setData("select-appuseraccount_id", listperiodicexpenses[index].appuseraccount_id.toString());
            setData("checkbox-excludefrom_savingsgoal", listperiodicexpenses[index].excludefrom_savingsgoal);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        post('/nuevogasto', {
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
                        <h4 className="text-lg font-bold uppercase">Nuevo Gasto</h4>
                        <hr className="my-3"></hr>
                        <form onSubmit={handleSubmit} autoComplete="false">
                            <h5 className="text-lg mb-2">Usar plantilla de gasto periodico</h5>
                            <div className="w-1/3 mb-6">
                                <BrandSelectForm label="Gasto Periodico" name="select-periodicexpense_id" onChange={(e) => { setData("select-periodicexpense_id", e.currentTarget.value); FillFieldwithPeriodicExpenseTemplate(parseFloat(e.currentTarget.value)) }}>
                                    {listperiodicexpenses.map(function (item, index) {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })}
                                </BrandSelectForm>
                            </div>
                            <h5 className="text-lg mb-2">Detalles</h5>
                            <div className="flex gap-6 mb-4">
                                <div className="flex-1/3 grow-0">
                                    <BrandInputForm name="input-concept" onChange={(e) => setData("input-concept", e.currentTarget.value)} value={data["input-concept"]}>Concepto</BrandInputForm>
                                </div>
                                <div>
                                    <BrandInputForm name="input-amount" onChange={(e) => setData("input-amount", (parseFloat(e.currentTarget.value)) as number)} value={data["input-amount"]} type="number" step={.01}>Monto</BrandInputForm>
                                </div>
                                <div>
                                    <BrandSelectForm label="Cuenta" name="select-appuseraccount_id" onChange={(e) => { setData("select-appuseraccount_id", e.currentTarget.value) }} value={data["select-appuseraccount_id"]}>
                                        {listappuseraccounts.map(function (item, index) {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </BrandSelectForm>
                                </div>
                            </div>
                            <div className="flex gap-6 mb-4">
                                <div className="flex-1/3 grow-0">
                                    <BrandSelectForm label="Categoria" name="select-categoryexpense_id" onChange={(e) => { setData("select-categoryexpense_id", e.currentTarget.value) }} value={data["select-categoryexpense_id"]}>
                                        {listcategoryexpense.map(function (item, index) {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </BrandSelectForm>
                                </div>
                                <div className="flex-auto ml-auto grow-0">
                                    <BrandInputCheckboxForm name="checkbox-excludefrom_savingsgoal" customOnChangeEvent={(value: boolean) => setData("checkbox-excludefrom_savingsgoal", value)} propdivisChecked={data["checkbox-excludefrom_savingsgoal"]}>Excluir de Meta de Ahorro</BrandInputCheckboxForm>
                                </div>
                                <div className="flex-auto grow-0">
                                    <BrandInputForm name="date-date" onChange={(e) => { setData("input-date", e.currentTarget.value) }} type="datetime-local" defaultValue={DatetoYMDTimeFormat(new Date())}>Fecha</BrandInputForm>
                                </div>
                            </div>
                            <div className="mb-4">
                                <BrandTextAreaForm name="input-notes" onChange={(e) => { setData("input-notes", e.currentTarget.value) }} value={data["input-notes"]}>Notas</BrandTextAreaForm>
                            </div>
                            <div className="flex justify-end gap-3">
                                <BrandAnchorSecondaryButton href="/dashboard">Cancelar</BrandAnchorSecondaryButton>
                                <BrandButtonPrimary disabled={processing}>Agregar</BrandButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}