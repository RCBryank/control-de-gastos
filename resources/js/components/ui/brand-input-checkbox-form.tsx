import React, { useEffect, useId, useState } from "react";

interface BrandCheckbox extends React.ComponentProps<"input"> {
    customOnChangeEvent: Function
}

export default function BrandInputCheckboxForm({ children, customOnChangeEvent, ...props }: BrandCheckbox) {
    const id = useId();

    const [divchecked, SetChecked] = useState<boolean>(false);
    const [firstignoreAnimation, setFirstIgnoreAnimation] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setFirstIgnoreAnimation(false);
        }, 500);
    }, []);

    function onClickHandler(value: boolean) {
        SetChecked(!divchecked);
    }

    useEffect(() => {
        customOnChangeEvent(divchecked);
    }, [divchecked]);

    return (
        <>
            <div>
                <input type="checkbox" id={id} className="hidden" checked={divchecked}></input>
                <label htmlFor={id}>{children}</label>
                <div onClick={(e) => { onClickHandler(!divchecked) }} className={"bg-gray-100 relative overflow-hidden w-9 h-9 border-[1px] rounded-sm cursor-pointer " + (divchecked ? "border-none" : "border-gray-400")}>
                    <div className={"absolute w-full h-full left-1/2 top-1/2 -translate-1/2  bg-brand-green rounded-full " + (firstignoreAnimation ? "opacity-0 " : "opacity-100 ") + (divchecked ? "anim-inputcheckbox-checked" : "anim-inputcheckbox-unchecked")}></div>
                </div>
            </div>
        </>
    )
}