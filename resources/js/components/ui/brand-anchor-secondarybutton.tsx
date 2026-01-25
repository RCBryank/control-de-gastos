import { Link } from "@inertiajs/react";
import React, { ReactNode } from "react";

export default function BrandAnchorSecondaryButton({ children, href }: { children: ReactNode, href: string }) {
    return <>
        <Link href={href} className="inline-block p-4 px-6 bg-brand-gray hover:bg-brand-gray-hover hover:text-white transition-colors duration-200 rounded-sm text-brand-white  cursor-pointer">{children}</Link>
    </>
}