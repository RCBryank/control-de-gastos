import WebAppLayout from "@/layouts/webapp-layout";
import { useForm } from "@inertiajs/react";
import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import BrandInputForm from "@/components/ui/brand-input-form";
import BrandSelectForm from "@/components/ui/brand-select-form";
import { useEffect, useState } from "react";
import { SelectAppUserAccountItem, SelectCategoryItem } from "@/types";
import BrandInputCheckboxForm from "@/components/ui/brand-input-checkbox-form";
import { DatetoYMDFormat } from "@/utils/format";
import BrandTextAreaForm from "@/components/ui/brand-textarea-form";

export default function NewExpense() {

    //-TODO. Cambiar el input date por un input datetime

    const { data, setData, post, processing, errors } = useForm({
        'input-concept': '',
        'input-date': DatetoYMDFormat(new Date()),
        'input-amount': 0,
        'checkbox-excludefrom_savingsgoal': false,
        'input-notes': '',
        'select-categoryexpense_id': 1,
        'select-periodicexpense_id': '',
        'select-appuseraccount_id': ''
    })

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
                                <BrandSelectForm label="Gasto Periodico" name="select-periodicexpense_id" onChange={(e) => { setData("select-periodicexpense_id", e.currentTarget.value) }}></BrandSelectForm>
                            </div>
                            <h5 className="text-lg mb-2">Detalles</h5>
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
                            </div>
                            <div className="flex gap-6 mb-4">
                                <div className="flex-1/3 grow-0">
                                    <BrandSelectForm label="Categoria" name="select-categoryexpense_id" onChange={(e) => { setData("select-categoryexpense_id", parseFloat(e.currentTarget.value) as number) }}>
                                        {listcategoryexpense.map(function (item, index) {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </BrandSelectForm>
                                </div>
                                <div className="flex-auto ml-auto grow-0">
                                    <BrandInputCheckboxForm name="checkbox-excludefrom_savingsgoal" customOnChangeEvent={(value: boolean) => setData("checkbox-excludefrom_savingsgoal", value)}>Excluir de Meta de Ahorro</BrandInputCheckboxForm>
                                </div>
                                <div className="flex-auto grow-0">
                                    <BrandInputForm name="date-date" onChange={(e) => { setData("input-date", e.currentTarget.value) }} type="Date" defaultValue={DatetoYMDFormat(new Date())}>Fecha</BrandInputForm>
                                </div>
                            </div>
                            <div className="mb-4">
                                <BrandTextAreaForm name="input-notes" onChange={(e) => { setData("input-notes", e.currentTarget.value) }}>Notas</BrandTextAreaForm>
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