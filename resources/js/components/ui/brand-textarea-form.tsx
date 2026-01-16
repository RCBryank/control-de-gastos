import React, { useId } from "react";

export default function BrandTextAreaForm({ children, ...props }: React.ComponentProps<"textarea">) {

    const inputId = useId();

    return (
        <>
            <label htmlFor={inputId}>
                {children}
            </label>
            <br></br>
            <textarea id={inputId} {...props} className="w-full bg-gray-200 border-[1px] p-2 rounded-sm border-gray-400 focus:outline-none focus:bg-white focus:text-brand-black focus:border-gray-500"></textarea>
        </>
    )
}