import { Link } from "@inertiajs/react";
import React, { ReactNode } from "react";

export default function BrandAnchorPrimaryButton({ children, href }: { children: ReactNode, href: string }) {
    return <>
        <Link href={href} className="bg-brand-green hover:bg-brand-green-hover hover:text-white transition-colors duration-200 rounded-sm text-brand-white p-3 px-6 cursor-pointer">{children}</Link>
    </>
}