import React, { ComponentProps, ComponentRef, useState } from "react";
import { Input } from "./input";

export default function BrandInput({ children, ...props }: React.ComponentProps<"input">) {

    const [focused, setFocused] = useState(false);

    function OnFocused() {
        setFocused(true);
    }

    function LostFocused() {
        setFocused(false);
    }

    return <>
        <div className="text-left">
            <label className="block">{children}</label>
            <div className="relative w-full h-12 overflow-hidden rounded-2xl ">
                <div className={"absolute top-0 w-[calc(100%+50px)] aspect-square " + (focused ? "anim-input-show anim-input-selection" : "")}></div>
                <div className="absolute w-full h-12 p-[2px]">
                    <input onFocus={OnFocused} onBlur={LostFocused} type="text" className="bg-gray-200 rounded-2xl focus:bg-[#fcfcfc] focus:outline-none p-2 inline-block w-full h-full text-center" {...props} />
                </div>
            </div>
        </div>
    </>
}