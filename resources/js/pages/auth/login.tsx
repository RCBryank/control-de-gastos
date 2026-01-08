import BrandInput from "@/components/ui/brand-input";

export default function login() {
    return <>
        <div className="bg-brand-background w-screen min-h-screen flex flex-col justify-center">
            <div className="bg-brand-white w-1/3 px-16 py-12 mx-auto rounded-2xl text-center">
                <h3 className="text-2xl font-bold">Autenticación</h3>
                <br/>
                <BrandInput/>
            </div>
        </div>
    </>
}