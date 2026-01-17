import { NumberRange } from "@/types";
import { ReactNode, useEffect, useState } from "react";

export default function BrandNumberRangeForm({ children, min, max, onChangeEvent }: { children: ReactNode, min: number, max: number, onChangeEvent: Function }) {

    const [range, setrange] = useState<NumberRange>({ min: 0, max: 0 });

    useEffect(() => {
        onChangeEvent(range.min, range.max);
    }, [range]);

    return (
        <>
            <div>
                <label>{children}</label>
                <div className="flex flex-row justify-items-center">
                    <input type="number" onChange={(e) => setrange({ min: parseFloat(e.currentTarget.value) || 0, max: range.max })} className="w-full bg-gray-200 border-[1px] p-2 rounded-sm border-gray-400 focus:outline-none focus:bg-white focus:text-brand-black focus:border-gray-500" placeholder="min"></input>
                    <p>-</p>
                    <input type="number" onChange={(e) => setrange({ min: range.min, max: parseFloat(e.currentTarget.value) || 0 })} className="w-full bg-gray-200 border-[1px] p-2 rounded-sm border-gray-400 focus:outline-none focus:bg-white focus:text-brand-black focus:border-gray-500" placeholder="max"></input>
                </div>
            </div>
        </>
    )
}