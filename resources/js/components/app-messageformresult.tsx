import { useEffect } from "react"

export default function AppMessageFormResult({ formResult, successmessage, errormessage, errors }: { formResult?: boolean, successmessage: string, errormessage: string, errors: Record<string, string> }) {

    const RenderFormResult = () => {
        if (formResult === undefined)
            return <></>
        else if (formResult == true)
            return <p>{successmessage}</p>
        else
            return <p>{errormessage}</p>
    }

    const RenderErrors = () => {
        return Object.entries(errors).map(([error, value]) => {
            return <li key={error}>{value}</li>
        });
    }

    return (
        <>
            <div className={"p-4 mb-4 " + (formResult == true ? "bg-green-200 rounded-md" : "bg-red-200")} hidden={formResult == undefined}>
                {RenderFormResult()}
                <ul className="list-disc list-inside">
                    {
                        RenderErrors()
                    }
                </ul>
            </div >
        </>
    )
}