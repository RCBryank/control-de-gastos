import { ReactNode } from "react";

export default function BrandButtonSecondary({ children, ...props }: React.ComponentProps<"button">) {
    return (
        <>
            <button {...props} className=" p-4 px-6 bg-brand-gray hover:bg-brand-gray-hover hover:text-white transition-colors duration-200 rounded-sm text-brand-white cursor-pointer">{children}</button>
        </>
    )
}