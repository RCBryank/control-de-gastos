import { LastActivityfromAccount, ListAccountItem } from "@/types/index";
import { NumbertoFormatCurrency, StringFullDatetoNormalFormat } from "@/utils/format";

export default function AccountItemList({ props, lastactivity, weeklybalance, monthlybalance, color }: { props: ListAccountItem, lastactivity?: LastActivityfromAccount, weeklybalance?: number, monthlybalance?: number, color: string }) {

    const RenderLastActivity = () => {
        if (lastactivity === undefined)
            return <></>

        return <p className="text-lg">{lastactivity.concept} - {NumbertoFormatCurrency(lastactivity.amount)} - {StringFullDatetoNormalFormat(lastactivity.recorddate)}</p>
    }

    return (
        <>
            <div className=" w-full rounded-lg p-12 cursor-pointer" style={{ backgroundColor: color }}>
                <div className="flex">
                    <div className="flex-6/12 grow-0">
                        <h1 className="text-6xl tracking-wider">{props.name}</h1>
                        <br></br>
                        <h3 className="text-5xl tracking-wider">{NumbertoFormatCurrency(props.account_balance)}</h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex gap-6 justify-end">
                            <p className="text-md">Última Actividad</p>
                            {RenderLastActivity()}
                        </div>
                        <div className="flex gap-6 justify-end">
                            <p className="text-lg">Balance Semanal</p>
                            <p className="text-2xl">{NumbertoFormatCurrency(weeklybalance || 0)}</p>
                        </div>
                        <div className="flex gap-6 justify-end">
                            <p className="text-lg">Balance Mensual</p>
                            <p className="text-2xl">{NumbertoFormatCurrency(monthlybalance || 0)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}