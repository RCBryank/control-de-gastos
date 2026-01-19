import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";

interface MenuItem extends React.ComponentProps<"a"> {
    selected: boolean
}

export default function MenuItemTopbar({ children, selected, href }: MenuItem) {

    return (
        <>
            <div className={"flex min-w-32 justify-center align-middle cursor-pointer hover:bg-brand-black-hover " + (selected ? "bg-brand-menuitem-selected" : "")}>
                <Link href={href} className="flex flex-col justify-center w-full h-full text-brand-white text-center text-sm grow-0 tracking-wider">
                    <div>
                        {children}
                    </div>
                </Link>
            </div>
        </>
    )
}