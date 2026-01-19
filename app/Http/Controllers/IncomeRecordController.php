<?php

namespace App\Http\Controllers;

use App\Models\Income_Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class IncomeRecordController extends Controller
{
    //
    public function getfiltered(Request $request)
    {
        $user = Auth::user();

        $query = DB::table('income_record')->select("income_record.id", "concept", "appuser_account.name", "notes", "amount", DB::raw("category_income.name as categoryname"), DB::raw("incomerecord_date as record_date"))
            ->join("category_income", "category_income.id", "income_record.categoryincome_id")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->join("app_user", "app_user.id", "appuser_id")
            ->where('app_user.id', $user->id)->whereNull("income_record.deleted_at");

        if ($request->input("concept") != "")
            $query->whereLike("concept", "%" . $request->input("concept") . "%");

        if ($request->input("categoryrecord_id") != 0)
            $query->where("category_income.id", $request->input("categoryrecord_id"));

        if ($request->input("appuseraccount_id") != 0)
            $query->where("appuser_account.id", $request->input("appuseraccount_id"));

        if ($request->input("min") != 0)
            $query->where("amount", ">=", $request->input("min"));

        if ($request->input("max") != 0)
            $query->where("amount", "<=", $request->input("max"));

        if ($request->input("date_begin") != "")
            $query->where("incomerecord_date", ">=", $request->input("date_begin") . " 00:00:00");

        if ($request->input("date_end") != "")
            $query->where("incomerecord_date", "<=", $request->input("date_end") . " 23:59:59");

        $query->orderBy("incomerecord_date", "DESC");

        $results = $query->get()->toArray();

        return response()->json($results);
    }

    public function store(Request $request)
    {
        //-- Validaciones
        $user = Auth::user();

        $incomerecord = Income_Record::create([
            "concept" => $request->input('input-concept'),
            "incomerecord_date" => $request->input('input-date') . ":" . date('s'),
            "amount"  => $request->input('input-amount'),
            "excludefrom_savingsgoal"  => $request->input('checkbox-excludefrom_savingsgoal'),
            "notes"  => $request->input('input-notes'),
            "categoryincome_id"  => $request->input('select-categoryincome_id'),
            "appuseraccount_id" => $request->input('select-appuseraccount_id'),
            "periodicincome_id" => $request->input('select-periodicincome_id') == '0' ? null : $request->input('select-periodicincome_id')
        ]);

        return redirect()->to('dashboard')->with("success");
    }

    public function edit($id)
    {
        $user = Auth::user();

        $record = Income_Record::select("income_record.id", "concept", "incomerecord_date", "amount", "excludefrom_savingsgoal", "notes", "categoryincome_id", "appuseraccount_id", "periodicincome_id")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->where("income_record.id", $id)->where("appuser_account.appuser_id", $user->id)
            ->firstOrFail();

        return Inertia::render('edit-income', ["preloadeddata" => $record->toArray()]);
    }

    public function update($id)
    {
        $request = request();

        $user = Auth::user();
        $recordid = $id;

        $incomerecord = Income_Record::select("appuser_id")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->find($recordid);

        if (isset($incomerecord)) {
            if ($incomerecord->appuser_id == $user->id) {
                Income_Record::findOrFail($recordid)->update(["concept" => $request->input("input-concept")]);
            } else {
                //- El registro no pertenece a una cuenta asociada al usuario
                return redirect()->back("ingresos")->withErrors(["Autorizacion" => "El registro no es del usuario autenticado"]);
            }
        } else {
            //-- No existe el registro 
        }

        return redirect()->to("ingresos")->with("success");
    }

    public function delete(Request $request)
    {
        //-- Validaciones
        $incomerecordids = $request->input("input-recordids", []);

        $user = Auth::user();

        foreach ($incomerecordids as $recordid) {
            $incomerecord = Income_Record::select("appuser_id")
                ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
                ->find($recordid);

            if (isset($incomerecord)) {
                if ($incomerecord->appuser_id == $user->id) {
                    Income_Record::destroy($recordid);
                } else {
                    //- El registro no pertenece a una cuenta asociada al usuario
                    return redirect()->back("ingresos")->withErrors(["Autorizacion" => "El registro no es del usuario autenticado"]);
                }
            } else {
                //-- No existe el registro 
            }
        }

        return redirect()->to("ingresos")->with("success");
    }
}
