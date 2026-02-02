import { Link } from "@inertiajs/react";
import React, { ReactNode } from "react";

export default function BrandAnchorPrimaryButton({ children, disabled, href }: { children: ReactNode, disabled?: boolean, href: string }) {


    return <>
        <Link href={href} className={"inline-block p-4 px-6 bg-brand-green hover:bg-brand-green-hover hover:text-white transition-colors duration-200 rounded-sm text-brand-white cursor-pointer "
            + (disabled ? "opacity-40 pointer-events-none" : "")
        }
        >{children}</Link>
    </>
}