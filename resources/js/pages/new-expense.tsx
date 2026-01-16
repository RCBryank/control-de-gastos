import WebAppLayout from "@/layouts/webapp-layout";
import { useForm } from "@inertiajs/react";
import BrandAnchorSecondaryButton from "@/components/ui/brand-anchor-secondarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";

export default function NewExpense() {

    const { data, setData, post, processing, errors } = useForm({

    })


    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <div className="bg-brand-white rounded-md p-12">
                        <h4 className="text-lg font-bold uppercase">Nuevo Gasto</h4>
                        <hr className="my-3"></hr>
                        <h5 className="text-lg mb-2">Detalles Generales</h5>
                        <form>
                            
                        </form>
                        <div className="flex justify-end gap-3">
                            <BrandAnchorSecondaryButton href="/miscuentas">Cancelar</BrandAnchorSecondaryButton>
                            <BrandButtonPrimary disabled={processing}>Agregar</BrandButtonPrimary>
                        </div>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}