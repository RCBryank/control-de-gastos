import AccountItemList from "@/components/account-item-list";
import BrandAnchorPrimaryButton from "@/components/ui/brand-anchor-primarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import SVGGridView from "@/components/ui/svg-grid-view";
import SVGListView from "@/components/ui/svg-listview";
import WebAppLayout from "@/layouts/webapp-layout";
import { useEffect, useState } from "react";
import { ListAccountItem } from "@/types/index";

export default function Accounts() {

    const [listaccounts, setlistaccounts] = useState<ListAccountItem[]>([]);

    const listColorsAvailable = ["#9cbffd", "#eefd9c", "#d19eff"];

    useEffect(() => {
        fetch('/accounts').then(response => response.json()).then(data => {
            setlistaccounts(data);
        })
    }, []);

    return (
        <>
            <WebAppLayout>
                <div className="container mx-auto">
                    <div className="flex justify-between">
                        <div>
                            <BrandAnchorPrimaryButton href={'/miscuentas/nueva'}>Nueva Cuenta</BrandAnchorPrimaryButton>
                        </div>
                        <div className="text-end">
                            <div className="inline-block w-8 aspect-square cursor-pointer mr-4">
                                <SVGGridView />
                            </div>
                            <div className="inline-block w-8 aspect-square cursor-pointer">
                                <SVGListView />
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 mb-8">
                        <p className="text-brand-white">Haz doble clic sobre una cuenta para ver mas detalles y acciones</p>
                    </div>
                    <div className="mb-12 flex flex-col gap-12">
                        {
                            listaccounts.map((item, index) => {
                                return <AccountItemList props={item} color={listColorsAvailable[index]}></AccountItemList>
                            })
                        }
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}