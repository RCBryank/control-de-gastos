import WebAppLayout from "@/layouts/webapp-layout";

export default function NewPeriodicExpense() {
    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <div className="bg-brand-white rounded-md p-12">
                        <h4 className="text-lg font-bold uppercase">Nuevo Gasto Periodico</h4>
                        <hr className="my-3"></hr>
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}