import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import BrandInputForm from "@/components/ui/brand-input-form";
import BrandSelectForm from "@/components/ui/brand-select-form";
import WebAppLayout from "@/layouts/webapp-layout";
import { SelectAppUserAccountItem } from "@/types";
import { DatetoYMDFormat } from "@/utils/format";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function NewSavingGoal() {

    const { data, setData, post, processing, errors } = useForm({
        "input-name": "",
        "date-date_begin": '',
        "date-date_end": '',
        "input-target_amount": 0,
        "select-appuseraccount_id": '',
    });

    const [listappuseraccounts, setlistappuseraccounts] = useState<SelectAppUserAccountItem[]>([]);

    useEffect(() => {
        fetch('/selectaccounts').then((response) => response.json()).then((response) => {
            if (response.length > 0) {
                setlistappuseraccounts(response);
                setData("select-appuseraccount_id", response[0].id);
            }
        });
    }, []);

    const OnSubmitHandler = (e: any) => {
        e.preventDefault();
        post('/metasdeahorro/nueva', {
            onSuccess: (response) => {

            },
            onError: (errors) => {

            },
            onFinish: () => {

            }
        })
    }

    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <div className="bg-brand-white rounded-md p-12">
                        <h4 className="text-lg font-bold uppercase">Nueva Meta de Ahorro</h4>
                        <hr className="my-3"></hr>
                        <h5 className="text-lg mb-2">Detalles</h5>

                        <form onSubmit={OnSubmitHandler}>
                            <div className="flex gap-6 mb-4">
                                <div className="flex-1/5 grow-0">
                                    <BrandInputForm name="input-name" onChange={(e) => setData("input-name", e.currentTarget.value)}>Identificador de la meta</BrandInputForm>
                                </div>
                                <div>
                                    <BrandInputForm name="date-date_begin" onChange={(e) => setData("date-date_begin", DatetoYMDFormat(new Date(e.currentTarget.value)))} type="date">Fecha de Inicio</BrandInputForm>
                                </div>
                                <div>
                                    <BrandInputForm name="date-date_end" onChange={(e) => setData("date-date_end", DatetoYMDFormat(new Date(e.currentTarget.value)))} type="date">Fecha Final</BrandInputForm>
                                </div>
                                <div>
                                    <BrandInputForm name="input-target_amount" onChange={(e) => setData("input-target_amount", Number(e.currentTarget.value))} type="number">Monto Objetivo</BrandInputForm>
                                </div>
                                <div>
                                    <BrandSelectForm label="Cuenta" name="select-appuseraccount_id" onChange={(e) => { setData("select-appuseraccount_id", e.currentTarget.value) }}>
                                        {listappuseraccounts.map(function (item, index) {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </BrandSelectForm>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <BrandAnchorSecondaryButton href="/metasdeahorro">Cancelar</BrandAnchorSecondaryButton>
                                <BrandButtonPrimary disabled={false}>Agregar</BrandButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}