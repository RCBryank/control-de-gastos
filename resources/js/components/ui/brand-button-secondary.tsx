import { ReactNode } from "react";

export default function BrandButtonSecondary({ children, ...props }: React.ComponentProps<"button">) {
    return (
        <>
            <button {...props} className="bg-brand-gray hover:bg-brand-gray-hover hover:text-white transition-colors duration-200 rounded-sm text-brand-white p-3 px-6 cursor-pointer">{children}</button>
        </>
    )
}