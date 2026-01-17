import { DateRange } from "@/types";
import { DatetoYMDFormat } from "@/utils/format";
import { ReactNode, useEffect, useState } from "react";

export default function BrandDateRangeForm({ children, defaultmin, defaultmax, onChangeEvent }: { children: ReactNode, defaultmin: Date, defaultmax: Date, onChangeEvent: Function }) {

    const [valuedaterange, setvaluedaterange] = useState<DateRange>({ min: defaultmin, max: defaultmax });

    useEffect(() => {
        onChangeEvent(valuedaterange.min, valuedaterange.max);
    }, [valuedaterange]);

    return (
        <>
            <div>
                <label>{children}</label>
                <div className="flex flex-row justify-items-center">
                    <input type="date" defaultValue={DatetoYMDFormat(valuedaterange.min)} onChange={(e) => setvaluedaterange({ min: new Date(e.currentTarget.value + "T00:00"), max: valuedaterange.max })} className="w-full bg-gray-200 border-[1px] p-2 rounded-sm border-gray-400 focus:outline-none focus:bg-white focus:text-brand-black focus:border-gray-500" placeholder="min"></input>
                    <p>-</p>
                    <input type="date" defaultValue={DatetoYMDFormat(valuedaterange.max)} onChange={(e) => setvaluedaterange({ min: valuedaterange.min, max: new Date(e.currentTarget.value + "T00:00") })} className="w-full bg-gray-200 border-[1px] p-2 rounded-sm border-gray-400 focus:outline-none focus:bg-white focus:text-brand-black focus:border-gray-500" placeholder="max"></input>
                </div>
            </div>
        </>
    )
}