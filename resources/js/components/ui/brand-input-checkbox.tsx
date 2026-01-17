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
            <div className="flex ">
                <input type="checkbox" id={id} className="hidden"></input>
                <div onClick={() => SetChecked(!checked)} className={"bg-gray-100 relative overflow-hidden inline-block w-6 h-6 border-[1px] rounded-sm cursor-pointer " + (checked ? "border-none" : "border-gray-400")}>
                    <div className={"absolute w-full h-full left-1/2 top-1/2 -translate-1/2  bg-brand-green rounded-full " + (firstignoreAnimation ? "opacity-0 " : "opacity-100 ") + (checked ? "anim-inputcheckbox-checked" : "anim-inputcheckbox-unchecked")}></div>
                </div>
                <p className="mx-4">{label}</p>
            </div>
        </>
    )
}