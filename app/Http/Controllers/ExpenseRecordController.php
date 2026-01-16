<?php

namespace App\Http\Controllers;

use App\Models\Expense_Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ExpenseRecordController extends Controller
{
    public function getfiltered(Request $request)
    {
        $user = Auth::user();

        $query = DB::table('expense_record')->select("expense_record.id", "concept", "appuser_account.name", "notes", "amount", DB::raw("category_expense.name as categoryname"), "expenserecord_date")
            ->join("category_expense", "category_expense.id", "expense_record.categoryexpense_id")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->join("app_user", "app_user.id", "appuser_id")
            ->where('app_user.id', $user->id);

        if ($request->input("concept") != "")
            $query->whereLike("concept", "%" . $request->input("concept") . "%");

        if ($request->input("categoryexpense_id") != 0)
            $query->where("category_expense.id", $request->input("categoryexpense_id"));

        if ($request->input("appuseraccount_id") != 0)
            $query->where("appuseraccount.id", $request->input("appuseraccount_id"));

        if ($request->input("min") != 0)
            $query->where("amount", ">=" , $request->input("min"));

        if ($request->input("max") != 0)
            $query->where("appuseraccount.id", "<=" , $request->input("max"));

        //->orderBy("expenserecord_date", "DESC");
        $results = $query->get()->toArray();

        return response()->json($results);
    }

    //
    public function store(Request $request)
    {
        //-- Validaciones
        $user = Auth::user();

        $periodicexpense_id = $request->input('select-periodicexpense_id');

        $expenserecord = Expense_Record::create([
            "concept" => $request->input('input-concept'),
            "expenserecord_date" => $request->input('input-date'),
            "amount"  => $request->input('input-amount'),
            "excludefrom_savingsgoal"  => $request->input('checkbox-excludefrom_savingsgoal'),
            "notes"  => $request->input('input-notes'),
            "categoryexpense_id"  => $request->input('select-categoryexpense_id'),
            "appuseraccount_id" => $user->id,
            "periodicexpense_id" => $periodicexpense_id == '' ? null : $periodicexpense_id,
        ]);

        return redirect()->to('dashboard')->with("success");
    }
}
