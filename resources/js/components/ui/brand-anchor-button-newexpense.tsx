import { Link } from "@inertiajs/react";

export default function BrandAnchorButtonNewExpense({ children, ...props }: React.ComponentProps<"a">) {
    return (
        <>
            <Link href={props.href} className="inline-block p-4 rounded-sm bg-brand-red text-brand-white tracking-wide">{children}</Link>
        </>
    )
}