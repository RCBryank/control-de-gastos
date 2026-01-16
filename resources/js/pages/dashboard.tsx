import BrandAnchorButtonNewExpense from "@/components/ui/brand-anchor-button-newexpense";
import WebAppLayout from "@/layouts/webapp-layout";

export default function Dashboard() {
    return <>
        <WebAppLayout>
            <div className="container mx-auto">
                <div className="text-end">
                    <BrandAnchorButtonNewExpense href="/nuevogasto">Nuevo Gasto</BrandAnchorButtonNewExpense>
                </div>
            </div>
        </WebAppLayout>
    </>
}