import AccountItemList from "@/components/account-item-list";
import BrandAnchorPrimaryButton from "@/components/ui/brand-anchor-primarybutton";
import BrandButtonPrimary from "@/components/ui/brand-button-primary";
import SVGGridView from "@/components/ui/svg-grid-view";
import SVGListView from "@/components/ui/svg-listview";
import WebAppLayout from "@/layouts/webapp-layout";
import { useEffect, useState } from "react";
import { Balance, LastActivityfromAccount, ListAccountItem } from "@/types/index";
import { getLastActivityfromAccounts } from "@/actions/App/Http/Controllers/AppuserAccountController";

export default function Accounts({ accounts }: { accounts: any }) {

    const [listaccounts, setlistaccounts] = useState<ListAccountItem[]>([]);
    const [listlastactivities, setlistlastactivites] = useState<LastActivityfromAccount[]>([]);
    const [listweeklybalances, setlistweeklybalances] = useState<Balance[]>([]);
    const [listmonthlyybalances, setlistmonthlybalances] = useState<Balance[]>([]);

    const listColorsAvailable = ["#9cbffd", "#eefd9c", "#d19eff"];

    function GetLastActivityfromAccount(appuseraccountid: number) {
        const _item = listlastactivities.find(x => x.appuseraccount_id == appuseraccountid);
        return _item;
    }

    function GetWeeklyBalance(appuseraccountid: number) {
        const _item = listweeklybalances.find(x => x.appuseraccount_id == appuseraccountid);
        return _item?.finalbalance;
    }

    function GetMonthlyBalance(appuseraccountid: number) {
        const _item = listmonthlyybalances.find(x => x.appuseraccount_id == appuseraccountid);
        return _item?.finalbalance;
    }

    useEffect(() => {
        fetch('/lastactivityfromaccounts').then(response => response.json()).then(data => {
            setlistlastactivites(data);
        });

        fetch('/weeklybalances').then(response => response.json()).then(data => {
            setlistweeklybalances(data);
        });

        fetch('/monthlybalances').then(response => response.json()).then(data => {
            setlistmonthlybalances(data);
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
                            accounts.map((item: any, index: any) => {
                                return <AccountItemList key={item.id} props={item} lastactivity={GetLastActivityfromAccount(item.id)} weeklybalance={GetWeeklyBalance(item.id)} monthlybalance={GetMonthlyBalance(item.id)} color={listColorsAvailable[index]}></AccountItemList>
                            }) /*
                           <></> */
                        }
                    </div>
                </div>
            </WebAppLayout>
        </>
    )
}