<?php

namespace App\Http\Controllers;

use App\Models\Periodic_Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PeriodicIncomeController extends Controller
{
    //
    public function selectgetfromuser()
    {
        $user = Auth::user();

        $results = Periodic_Income::select("periodic_income.id", DB::raw("concept as name"), "amount", "excludefrom_savingsgoal", "notes", "categoryincome_id", "appuseraccount_id")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->where("appuser_account.appuser_id", $user->id)
            ->get()->toArray();

        return response()->json($results);
    }

    public function store(Request $request)
    {
        //-- Validacion
        $periodicincome = Periodic_Income::create([
            "concept" => $request->input("input-concept"),
            "date_begin" => $request->input("date-date_begin"),
            "date_end" => $request->input("date-date_end", null),
            "income_frequency" => $request->input("input-income_frequency"),
            "amount" => $request->input("input-amount"),
            "excludefrom_savingsgoal" => $request->input("checkbox-excludefrom_savingsgoal"),
            "notes" => $request->input("input-notes"),
            "categoryincome_id" => $request->input("select-categoryincome_id"),
            "appuseraccount_id" => $request->input("select-appuseraccount_id")
        ]);

        return redirect()->to("ingresos")->with("success");
    }
}
