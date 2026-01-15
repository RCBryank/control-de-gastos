import React, { useId } from "react";

interface CustomSelectProps extends React.ComponentProps<"select"> {
    label: string
}

export default function BrandSelectForm({ children, label, ...props }: CustomSelectProps) {
    const userId = useId();

    return (
        <>
            <label htmlFor={userId}>{label}</label>
            <select id={userId} {...props} className="w-full bg-gray-200 border-[1px] p-2 rounded-sm border-gray-400 focus:outline-none focus:bg-white focus:text-brand-black focus:border-gray-500">
                {children}
            </select>
        </>
    )
}