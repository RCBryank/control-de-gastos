export default function BrandInput() {
    return <>
        <div className="text-left">
            <label className="block">Usuario</label>
            <div className="rounded-2xl relative overflow-hidden w-full h-12">
                <div className="anim-input-selection absolute top-0 w-full h-full"></div>
                <input type="email" className="absolute bg-gray-200 rounded-2xl focus:outline-none p-2 inline-block z-10 w-full h-full" />
            </div>
        </div>
    </>
}