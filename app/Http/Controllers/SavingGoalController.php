<?php

namespace App\Http\Controllers;

use App\Models\Saving_Goal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SavingGoalController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('savingsgoal');
    }

    public function getfromuser()
    {
        $user = Auth::user();

        $results = Saving_Goal::select("saving_goal.id", "saving_goal.name", "date_begin", "date_end", "target_amount", "appuseraccount_id", DB::raw("appuser_account.name as 'appuseraccount_name'"))
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->where("appuser_id", $user->id)
            ->orderBy("date_begin", "DESC")
            ->get()->toArray();

        return response()->json($results);
    }

    public function store(Request $request)
    {
        //-- Validar parametros

        Saving_Goal::create([
            "name" => $request->post("input-name"),
            "date_begin" => $request->post("date-date_begin"),
            "date_end" => $request->post("date-date_end"),
            "target_amount" => $request->post("input-target_amount"),
            "appuseraccount_id" => $request->post("select-appuseraccount_id"),
        ]);

        return redirect()->back();
    }
}
