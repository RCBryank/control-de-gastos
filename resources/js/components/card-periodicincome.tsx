import { NextPeriodRecord } from "@/types";
import { NumbertoFormatCurrency, YMDToNormalFormat } from "@/utils/format";

export default function CardPeriodicIncome({ itemprops }: { itemprops: NextPeriodRecord }) {
    return (
        <>
            <div className="shrink-0 w-64 bg-white rounded-lg overflow-hidden">
                <div className="whitespace-nowrap w-[40px] overflow-hidden text-ellipsis ">

                </div>
                <div className="bg-brand-blue px-5 py-3 flex flex-row items-baseline text-brand-white">
                    <div className="whitespace-nowrap grow-0 overflow-hidden text-ellipsis font-bold">
                        {itemprops.concept}
                    </div>
                    <div className="text-end ml-auto">
                        <p className="font-bold text-sm mt-auto">{YMDToNormalFormat(itemprops.date)}</p>
                    </div>
                </div>
                <div className="p-5 py-3 text-brand-black border-[1px] border-gray-100">
                    <p className="text-sm">{itemprops.accountname}</p>
                    <p className="text-lg tracking-widest">{NumbertoFormatCurrency(itemprops.amount)}</p>
                </div>
            </div>
        </>
    )
}