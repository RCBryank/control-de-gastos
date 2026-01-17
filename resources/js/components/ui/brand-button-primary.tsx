import React from "react";

export default function BrandButtonPrimary({ children, ...props }: React.ComponentProps<"button">) {
    return <>
        <button className="bg-brand-green hover:bg-brand-green-hover transition-colors duration-200 rounded-sm text-brand-white p-3 px-6 focus:bg-brand-green-hover focus:outline-none cursor-pointer" {...props}>
            {children}
            {props.disabled}
        </button>
    </>
}