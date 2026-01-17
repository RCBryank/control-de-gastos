import { useEffect, useId, useState } from "react";

export default function BrandInputCheckbox({ label }: { label?: string }) {

    const id = useId();

    const [checked, SetChecked] = useState<boolean>(false);
    const [firstignoreAnimation, setFirstIgnoreAnimation] = useState<boolean>(true);
    const [focused, SetFocused] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setFirstIgnoreAnimation(false);
        }, 500);
    }, []);

    return (
        <>
            <div className="flex cursor-pointer" onClick={() => SetChecked(!checked)}>
                <input type="checkbox" id={id} className="opacity-0 w-0 h-0" onFocus={() => { SetFocused(true) }} onBlur={() => { SetFocused(false) }}></input>
                <div className={"bg-gray-100 relative overflow-hidden inline-block w-6 aspect-square border-[1px] rounded-sm cursor-pointer " + (checked ? "border-none" : "border-gray-400") + (focused ? " bg-gray-300" : "")}>
                    <div className={"absolute w-0 aspect-square left-1/2 top-1/2 -translate-1/2  bg-brand-green rounded-full " + (firstignoreAnimation ? "opacity-0 " : "opacity-100 ") + (checked ? "anim-inputcheckbox-checked" : "anim-inputcheckbox-unchecked")}></div>
                </div>
                <p className="mx-4">{label}</p>
            </div>
        </>
    )
}