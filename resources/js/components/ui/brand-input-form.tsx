import { useId } from "react"

export default function BrandInputForm({ children, ...props }: React.ComponentProps<"input">) {

    const inputId = useId();

    return (
        <>
            <label htmlFor={inputId}>
                {children}
            </label>
            <br></br>
            <input id={inputId} {...props} className="w-full bg-gray-200 border-[1px] p-2 rounded-sm border-gray-400 focus:outline-none focus:bg-white focus:text-brand-black focus:border-gray-500"/>
        </>
    )
}