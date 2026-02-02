import BrandInputCheckboxForm from "@/components/ui/brand-input-checkbox-form"
import BrandInputForm from "@/components/ui/brand-input-form"
import BrandSelectForm from "@/components/ui/brand-select-form"
import BrandTextAreaForm from "@/components/ui/brand-textarea-form"
import { FormPeriodicExpenseRecord, SelectAppUserAccountItem, SelectCategoryItem } from "@/types"

export default function SectionPeriodicExpenseDetails({ listcategoryexpense, listappuseraccounts, data, setData }:
    { listcategoryexpense: SelectCategoryItem[], listappuseraccounts: SelectAppUserAccountItem[], data: FormPeriodicExpenseRecord, setData: any }) {
    return (
        <>
            <div className="flex gap-6 mb-4">
                <div className="flex-1/3 grow-0">
                    <BrandInputForm name="input-concept" defaultValue={data["input-concept"]} onChange={(e) => setData("input-concept", e.currentTarget.value)}>Concepto</BrandInputForm>
                </div>
                <div>
                    <BrandInputForm name="input-amount" defaultValue={data["input-amount"]} onChange={(e) => setData("input-amount", (parseFloat(e.currentTarget.value)) as number)} type="number">Monto</BrandInputForm>
                </div>
                <div>
                    <BrandSelectForm label="Cuenta" name="select-appuseraccount_id" value={data["select-appuseraccount_id"]} onChange={(e) => { setData("select-appuseraccount_id", e.currentTarget.value) }} >
                        {listappuseraccounts.map(function (item, index) {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </BrandSelectForm>
                </div>
                <div>
                    <BrandInputForm type="number" onChange={(e) => { setData("input-billing_frequency", parseFloat(e.currentTarget.value)) }} defaultValue={data["input-billing_frequency"]}>Dias de Frecuencia</BrandInputForm>
                </div>
                <div className="flex-auto ml-auto grow-0">
                    <BrandInputCheckboxForm name="checkbox-excludefrom_savingsgoal" customOnChangeEvent={(value: boolean) => setData("checkbox-excludefrom_savingsgoal", value)} propdivisChecked={data["checkbox-excludefrom_savingsgoal"]}>Excluir de Meta de Ahorro</BrandInputCheckboxForm>
                </div>
            </div>
            <div className="flex gap-6 mb-4">
                <div>
                    <BrandInputForm type="date" className="inline-block" defaultValue={data["date-date_begin"]} onChange={(e) => setData("date-date_begin", e.currentTarget.value)}>Empezando esta fecha</BrandInputForm>
                </div>
                <div>
                    <BrandInputForm type="date" className="inline-block" defaultValue={data["date-date_end"] || ''} onChange={(e) => setData("date-date_end", e.currentTarget.value)}>Hasta esta fecha</BrandInputForm>
                </div>
                <div>
                    <BrandSelectForm label="Categoria" name="select-categoryexpense_id" value={data["select-categoryexpense_id"]} onChange={(e) => { setData("select-categoryexpense_id", e.currentTarget.value) }}>
                        {listcategoryexpense.map(function (item, index) {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </BrandSelectForm>
                </div>
            </div>
            <div className="mb-4">
                <BrandTextAreaForm name="input-notes" defaultValue={data["input-notes"]} onChange={(e) => { setData("input-notes", e.currentTarget.value) }}>Notas</BrandTextAreaForm>
            </div>
        </>
    )
}