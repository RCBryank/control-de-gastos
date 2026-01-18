<?php

namespace App\Http\Controllers;

use App\Models\Periodic_Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PeriodicExpenseController extends Controller
{
    //
    public function selectgetfromuser()
    {
        $user = Auth::user();

        $results = Periodic_Expense::select("periodic_expense.id", DB::raw("concept as name"), "amount", "excludefrom_savingsgoal", "notes", "categoryexpense_id", "appuseraccount_id")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->where("appuser_account.appuser_id", $user->id)
            ->get()->toArray();

        return response()->json($results);
    }

    public function store(Request $request)
    {
        //-- Validacion

        $periodicexpense = Periodic_Expense::create([
            "concept" => $request->input("input-concept"),
            "date_begin" => $request->input("date-date_begin"),
            "date_end" => $request->input("date-date_end", null),
            "billing_frequency" => $request->input("input-billing_frequency"),
            "amount" => $request->input("input-amount"),
            "excludefrom_savingsgoal" => $request->input("checkbox-excludefrom_savingsgoal"),
            "notes" => $request->input("input-notes"),
            "categoryexpense_id" => $request->input("select-categoryexpense_id"),
            "appuseraccount_id" => $request->input("select-appuseraccount_id")
        ]);

        return redirect()->to("gastos")->with("success");
    }
}
