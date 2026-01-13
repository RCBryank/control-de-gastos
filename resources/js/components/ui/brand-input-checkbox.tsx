import { useEffect, useId, useState } from "react";

export default function BrandInputCheckbox({ label }: { label?: string }) {

    const id = useId();

    const [checked, SetChecked] = useState<boolean>(false);
    const [firstignoreAnimation, setFirstIgnoreAnimation] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(()=>{
            setFirstIgnoreAnimation(false);
        }, 500);
    }, []);

    return (
        <>
            <div className="flex ">
                <input type="checkbox" id={id} className="hidden"></input>
                <div onClick={() => SetChecked(!checked)} className={"bg-gray-100 relative overflow-hidden inline-block w-6 aspect-square border-[1px] rounded-sm cursor-pointer " + (checked ? "border-none" : "border-gray-400")}>
                    <div className={"absolute w-0 aspect-square left-1/2 top-1/2 -translate-1/2  bg-brand-green rounded-full " + (firstignoreAnimation ? "opacity-0 " : "opacity-100 ") + (checked ? "anim-inputcheckbox-checked" : "anim-inputcheckbox-unchecked")}></div>
                </div>
                <label htmlFor={id} className="inline-block mx-4">{label}</label>
            </div>
        </>
    )
}