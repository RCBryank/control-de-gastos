import { ListAccountItem } from "@/types/index";
import { NumbertoFormatCurrency } from "@/utils/format";

export default function AccountItemList({ props, color }: { props: ListAccountItem, color: string }) {

    return (
        <>
            <div className=" w-full rounded-lg p-12 cursor-pointer" style={{backgroundColor: color}}>
                <div className="flex">
                    <div className="flex-6/12 grow-0">
                        <h1 className="text-6xl tracking-wider">{props.name}</h1>
                        <br></br>
                        <h3 className="text-5xl tracking-wider">{NumbertoFormatCurrency(props.account_balance)}</h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex gap-6 justify-end">
                            <p className="text-md">Última Actividad</p>
                            <p className="text-lg">Compra Mercado Libre - $3,500.00 - 10/01/2026</p>
                        </div>
                        <div className="flex gap-6 justify-end">
                            <p className="text-lg">Balance Semanal</p>
                            <p className="text-2xl">-$3,500.00</p>
                        </div>
                        <div className="flex gap-6 justify-end">
                            <p className="text-lg">Balance Mensual</p>
                            <p className="text-2xl">-$5,250.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}