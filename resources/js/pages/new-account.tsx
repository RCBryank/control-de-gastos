import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import BrandButtonSecondary from "@/components/ui/brand-button-secondary";
import BrandInputForm from "@/components/ui/brand-input-form";
import BrandSelectForm from "@/components/ui/brand-select-form";
import WebAppLayout from "@/layouts/webapp-layout";
import { useForm } from "@inertiajs/react";

export default function NewAccount() {

    const { data, setData, post, processing, errors } = useForm({
        'input-name': '',
        'input-account_balance': 0,
        'input-bank': '',
        'input-account_number': '',
        'input-accounttype_id': 0,
        'input-description': ''
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post('/miscuentas/nueva', {
            onSuccess: (response) => {
                console.log(response);
            },
            onError: (errors) => {
                console.log(errors);
            },
            onFinish: () => {
                console.log("Finish");
            }
        })
    }

    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <div className="bg-brand-white rounded-md p-12">
                        <h4 className="text-lg font-bold uppercase">Nueva Cuenta</h4>
                        <hr className="my-3"></hr>
                        <h5 className="text-lg mb-2">Detalles Generales</h5>
                        <form onSubmit={handleSubmit} autoComplete="false">
                            <div className="flex gap-6 mb-4">
                                <div className="flex-1/3 grow-0">
                                    <BrandInputForm name="input-name" onChange={(e) => setData("input-name", e.currentTarget.value)} type="text" autoComplete="false">Nombre de la cuenta</BrandInputForm>
                                </div>
                                <div className="ml-auto">
                                    <BrandInputForm name="input-account_balance" type="number" step=".01" autoComplete="false">Balance Inicial</BrandInputForm>
                                </div>
                            </div>
                            <div className="flex gap-6 mb-4">
                                <div className="flex-1/3 grow-0">
                                    <BrandInputForm name="input-bank" type="text" autoComplete="false">Nombre del Banco</BrandInputForm>
                                </div>
                                <div className="flex-auto grow-0">
                                    <BrandInputForm name="input-account_number" type="text" autoComplete="false">Numero de Cuenta</BrandInputForm>
                                </div>
                                <div className="flex-auto grow-0">
                                    <BrandSelectForm name="input-accounttype_id" label="Tipo de Cuenta">
                                        <option value="1">Efectivo</option>
                                        <option value="2">Cuenta Bancaria Débito</option>
                                    </BrandSelectForm>
                                </div>
                            </div>
                            <div className="mb-4">
                                <BrandInputForm name="input-description" type="text" autoComplete="false">Descripción</BrandInputForm>
                            </div>
                            <br></br>
                            <div className="flex justify-end gap-3">
                                <BrandAnchorSecondaryButton href="/miscuentas">Cancelar</BrandAnchorSecondaryButton>
                                <BrandButtonPrimary disabled={processing}>Crear</BrandButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}