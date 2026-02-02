import CardPeriodicRecord from "@/components/card-periodicrecord";
import { NextPeriodRecord } from "@/types";
import { ReactNode, useEffect, useState } from "react";

export default function SectionNextPeriodicRecords({ children, href }: { children: ReactNode, href: string }) {

    const [listCardPeriodicRecords, setListCardPeriodicRecords] = useState<NextPeriodRecord[]>([]);

    useEffect(() => {
        fetch(href).then((response) => response.json()).then((response) => {
            setListCardPeriodicRecords(response);
        });
    }, []);



    return (
        <>
            <div className="bg-brand-white p-8 rounded-md">
                <h3 className="font-bold">{children}</h3>
                <div className="flex gap-6 flex-nowrap overflow-auto p-2 my-4">
                    {
                        listCardPeriodicRecords.map((item, index) => {
                            return <CardPeriodicRecord itemprops={item} key={item.unique_id}></CardPeriodicRecord>
                        })
                    }
                </div>
            </div>
        </>
    )
}