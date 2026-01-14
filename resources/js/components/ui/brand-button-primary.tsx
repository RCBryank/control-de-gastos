import React from "react";

export default function BrandButtonPrimary({ children, ...props }: React.ComponentProps<"button">) {
    return <>
        <button className="bg-brand-green hover:bg-brand-green-hover hover:text-white transition-colors duration-200 rounded-sm text-brand-white p-3 px-6 cursor-pointer" {...props}>{children}</button>
    </>
}