import React, { useEffect } from "react";

interface MenuItem extends React.ComponentProps<"a"> {
    selected: boolean
}

export default function MenuItemTopbar({ children, ...props }: MenuItem) {
    
    return (
        <>
            <div className={"flex flex-col min-w-32 justify-center align-middle cursor-pointer hover:bg-brand-black-hover " + (props.selected ? "bg-brand-menuitem-selected" : "")}>
                <a {...props} className="text-brand-white text-center text-sm grow-0 tracking-wider">
                    {children}
                </a>
            </div>
        </>
    )
}