import CardPeriodicIncome from "@/components/card-periodicincome";
import { NextPeriodRecord } from "@/types";
import { useEffect, useState } from "react";

export default function SectionNextPeriodicIncomes() {

    const [listCardPeriodicIncome, setListCardPeriodicIncome] = useState<NextPeriodRecord[]>([]);

    useEffect(() => {
        fetch("/nextperiodicincomes").then((response) => response.json()).then((response) => {
            setListCardPeriodicIncome(response);
        });
    }, []);



    return (
        <>
            <div className="bg-brand-white p-8 rounded-md">
                <h3 className="font-bold">Próximos ingresos programados</h3>
                <div className="flex gap-6 flex-nowrap overflow-auto p-2 my-4">
                    {
                        listCardPeriodicIncome.map((item, index) => {
                            return <CardPeriodicIncome itemprops={item} key={index}></CardPeriodicIncome>
                        })
                    }
                </div>
            </div>
        </>
    )
}