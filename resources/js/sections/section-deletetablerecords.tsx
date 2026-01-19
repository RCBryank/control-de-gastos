import BrandButtonSecondary from "@/components/ui/brand-button-secondary";
import { useForm } from "@inertiajs/react"
import { useEffect } from "react";

export default function SectionDeleteTableRecords({ hrefdelete, selectedrows, onDeleteSuccess }: { hrefdelete: string, selectedrows: number[], onDeleteSuccess: Function }) {

    const { data, setData, post, processing, errors } = useForm({
        '_method': 'DELETE',
        'input-recordids': selectedrows
    });

    const onHandlerSubmit = (e: any) => {
        e.preventDefault();

        post(hrefdelete, {
            onSuccess: (response) => {
                onDeleteSuccess();
            },
            onError: (errors) => {

            },
            onFinish: () => {

            }
        })
    }

    useEffect(() => {
        setData('input-recordids', selectedrows);
    }, [selectedrows])

    return (
        <>
            <form onSubmit={onHandlerSubmit}>
                <BrandButtonSecondary>Eliminar</BrandButtonSecondary>
            </form>
        </>
    )
}