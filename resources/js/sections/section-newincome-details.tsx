import BrandInputCheckboxForm from "@/components/ui/brand-input-checkbox-form";
import BrandInputForm from "@/components/ui/brand-input-form";
import BrandSelectForm from "@/components/ui/brand-select-form";
import BrandTextAreaForm from "@/components/ui/brand-textarea-form";
import { FormIncomeRecord, SelectAppUserAccountItem, SelectCategoryItem, SelectPeriodicExpenseItem } from "@/types";
import { DatetoYMDTimeFormat } from "@/utils/format";

export default function SectionNewIncomeDetails({ listcategoryincome, listperiodicincomes, listappuseraccounts, data, setData, FillFieldwithPeriodicExpenseTemplate }:
    { listcategoryincome: SelectCategoryItem[], listperiodicincomes: SelectPeriodicExpenseItem[], listappuseraccounts: SelectAppUserAccountItem[], data: FormIncomeRecord, setData: any, FillFieldwithPeriodicExpenseTemplate: Function }) {
    return (
        <>
            <h5 className="text-lg mb-2">Usar plantilla de ingreso periodico</h5>
            <div className="w-1/3 mb-6">
                <BrandSelectForm label="Gasto Periodico" name="select-periodicexpense_id" onChange={(e) => { setData("select-periodicincome_id", e.currentTarget.value); FillFieldwithPeriodicExpenseTemplate(parseFloat(e.currentTarget.value)) }}>
                    {listperiodicincomes.map(function (item, index) {
                        return <option key={item.id} value={item.id}>{item.name}</option>
                    })}
                </BrandSelectForm>
            </div>
            <h5 className="text-lg mb-2">Detalles</h5>
            <div className="flex gap-6 mb-4">
                <div className="flex-1/3 grow-0">
                    <BrandInputForm name="input-concept" onChange={(e) => setData("input-concept", e.currentTarget.value)} value={data["input-concept"]}>Concepto</BrandInputForm>
                </div>
                <div>
                    <BrandInputForm name="input-amount" onChange={(e) => setData("input-amount", (parseFloat(e.currentTarget.value)) as number)} value={data["input-amount"]} type="number" step={.01}>Monto</BrandInputForm>
                </div>
                <div>
                    <BrandSelectForm label="Cuenta" name="select-appuseraccount_id" onChange={(e) => { setData("select-appuseraccount_id", e.currentTarget.value) }} value={data["select-appuseraccount_id"]}>
                        {listappuseraccounts.map(function (item, index) {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </BrandSelectForm>
                </div>
            </div>
            <div className="flex gap-6 mb-4">
                <div className="flex-1/3 grow-0">
                    <BrandSelectForm label="Categoria" name="select-categoryexpense_id" onChange={(e) => { setData("select-categoryincome_id", e.currentTarget.value) }} value={data["select-categoryincome_id"]}>
                        {listcategoryincome.map(function (item, index) {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </BrandSelectForm>
                </div>
                <div className="flex-auto ml-auto grow-0">
                    <BrandInputCheckboxForm name="checkbox-excludefrom_savingsgoal" customOnChangeEvent={(value: boolean) => setData("checkbox-excludefrom_savingsgoal", value)} propdivisChecked={data["checkbox-excludefrom_savingsgoal"]}>Excluir de Meta de Ahorro</BrandInputCheckboxForm>
                </div>
                <div className="flex-auto grow-0">
                    <BrandInputForm name="date-date" onChange={(e) => { setData("input-date", e.currentTarget.value) }} type="datetime-local" defaultValue={DatetoYMDTimeFormat(new Date())}>Fecha</BrandInputForm>
                </div>
            </div>
            <div className="mb-4">
                <BrandTextAreaForm name="input-notes" onChange={(e) => { setData("input-notes", e.currentTarget.value) }} value={data["input-notes"]}>Notas</BrandTextAreaForm>
            </div>
        </>
    )
}