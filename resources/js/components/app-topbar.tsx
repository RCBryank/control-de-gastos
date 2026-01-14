import { ReactNode } from "react";

export default function AppTopbar({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="bg-brand-black border-b-[1px] border-b-gray-600">
                <nav className="flex flex-row gap-18 w-full h-12 container mx-auto">
                    {children}
                </nav>
            </div>
        </>
    )
}