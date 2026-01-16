import { ReactNode } from "react";

export default function BrandDateRangeForm({ children }: { children: ReactNode}) {
    return (
        <>
            <div>
                <label>{children}</label>
                <div className="flex flex-row justify-items-center">
                    <input type="date" className="w-full bg-gray-200 border-[1px] p-2 rounded-sm border-gray-400 focus:outline-none focus:bg-white focus:text-brand-black focus:border-gray-500" placeholder="min"></input>
                    <p>-</p>
                    <input type="date" className="w-full bg-gray-200 border-[1px] p-2 rounded-sm border-gray-400 focus:outline-none focus:bg-white focus:text-brand-black focus:border-gray-500" placeholder="max"></input>
                </div>
            </div>
        </>
    )
}