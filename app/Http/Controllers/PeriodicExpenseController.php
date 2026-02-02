<?php

namespace App\Http\Controllers;

use App\Models\Periodic_Expense;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PeriodicExpenseController extends Controller
{
    //
    public function getfromuser()
    {
        $user = Auth::user();

        $results  = Periodic_Expense::select("periodic_expense.id", "concept", "date_begin", "date_end", DB::raw("billing_frequency as 'frequency'"), "amount", "excludefrom_savingsgoal", "notes", "category_expense.name as category_name")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->join("category_expense", "category_expense.id", "categoryexpense_id")
            ->where("appuser_id", $user->id)
            ->orderBy("periodic_expense.id", "asc")
            ->get()->toArray();

        return response()->json($results);
    }

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

    public function edit($id)
    {
        $user = Auth::user();

        $record = Periodic_Expense::select("periodic_expense.id", "concept", "date_begin", "date_end", "billing_frequency", "amount", "excludefrom_savingsgoal", "notes", "categoryexpense_id", "appuseraccount_id")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->where("periodic_expense.id", $id)->where("appuser_account.appuser_id", $user->id)
            ->firstOrFail();

        return Inertia::render('edit-periodicexpense', ["preloadeddata" => $record->toArray()]);
    }

    public function update($id)
    {
        $request = request();

        $user = Auth::user();
        $recordid = $id;

        $incomerecord = Periodic_Expense::select("appuser_id")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->find($recordid);

        if (isset($incomerecord)) {
            if ($incomerecord->appuser_id == $user->id) {
                Periodic_Expense::findOrFail($recordid)->update([
                    "concept" => $request->input("input-concept"),
                    "date_begin" => $request->input("date-date_begin"),
                    "date_end" => $request->input("date-date_end"),
                    "billing_frequency" => $request->input("input-billing_frequency"),
                    "amount" => $request->input("input-amount"),
                    "excludefrom_savingsgoal" => $request->input("checkbox-excludefrom_savingsgoal") ? true : false,
                    "notes" => $request->input("input-notes"),
                    "categoryexpense_id" => $request->input("select-categoryexpense_id"),
                    "appuseraccount_id" => $request->input("select-appuseraccount_id")
                ]);
            } else {
                //- El registro no pertenece a una cuenta asociada al usuario
                return redirect()->back("gastosperiodicos")->withErrors(["Autorizacion" => "El registro no es del usuario autenticado"]);
            }
        } else {
            //-- No existe el registro 
        }

        return redirect()->back()->with(['data' => null]);
    }


    public function delete(Request $request)
    {
        //-- Validaciones
        $expenserecordids = $request->input("input-recordids", []);

        $user = Auth::user();

        foreach ($expenserecordids as $recordid) {
            $incomerecord = Periodic_Expense::select("appuser_id")
                ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
                ->find($recordid);

            if (isset($incomerecord)) {
                if ($incomerecord->appuser_id == $user->id) {
                    Periodic_Expense::destroy($recordid);
                } else {
                    //- El registro no pertenece a una cuenta asociada al usuario
                    return redirect()->back("gastosperiodicos")->withErrors(["Autorizacion" => "El registro no es del usuario autenticado"]);
                }
            } else {
                //-- No existe el registro 
            }
        }

        return redirect()->to("gastosperiodicos")->with("success");
    }

    public function getnextperiodicexpenses()
    {
        $user = Auth::user();
        $today = date("Y-m-d");

        //-- Obten todos los registros cuyas fechas inicios sean antes del dia actual y sus fechas finales sean null o despues del dia de hoy
        $periodicrecords = Periodic_Expense::select("periodic_expense.id", "concept", "amount", "billing_frequency", "date_begin", "date_end", DB::raw("appuser_account.name as accountname"))
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->where("appuser_id", $user->id)
            ->whereRaw("(date_end >= '$today' OR date_end is NULL)")
            ->orderBy("billing_frequency", "ASC")
            ->get();

        $records = array();
        $maxrecords = 5;

        if (empty($periodicrecords) == false) {
            $arrayrecords = $periodicrecords->toArray();

            $today = now();
            $differencetotodayarray = array();
            $minstep = null;
            foreach ($periodicrecords as $record) {
                $daterecord = DateTime::createFromFormat("Y-m-d H:i", $record["date_begin"] . " 00:00");
                $difference = date_diff(DateTime::createFromFormat("Y-m-d H:i", date("Y-m-d") . " 00:00"), $daterecord, false);
                $daysdiff =  $difference->invert == 0 ? $difference->days : $difference->days * -1;

                $step = abs(ceil($daysdiff / $record["billing_frequency"]));
                $closesdatetotoday =  $today < $daterecord ? $daterecord : date_add(DateTime::createFromFormat("Y-m-d H:i", $record["date_begin"] . " 00:00"), date_interval_create_from_date_string(($step * $record["billing_frequency"]) . " days"));

                $item = ["id" => $record["id"], "difference" => $daysdiff, "step" => $step, "closestdaytotoday" => $closesdatetotoday];

                if (isset($minstep) == false || $minstep > $step) {
                    $minstep = $step;
                }

                array_push($differencetotodayarray, $item);
            }

            $arrayDatestoSort = array();

            for ($e = 0; $e < count($arrayrecords); $e++) {
                $record = $arrayrecords[$e];
                $initialstep = $differencetotodayarray[$e]["difference"] >= 0 ? 0 : $differencetotodayarray[$e]["step"];
                for ($i = 0; $i < $maxrecords; $i++) {
                    $dateresult = date_add(DateTime::createFromFormat("Y-m-d H:i", $record["date_begin"] . " 00:00"), date_interval_create_from_date_string(($record["billing_frequency"] * ($initialstep + $i))  . " days"));
                    $item = ["index" => $e, "date" => $dateresult];
                    array_push($arrayDatestoSort, $item);
                }
            }

            array_multisort(array_column($arrayDatestoSort, 'date'), SORT_ASC, $arrayDatestoSort);

            $i = 0;
            foreach ($arrayDatestoSort as $sorteditem) {
                $item = $arrayrecords[$sorteditem["index"]];
                $item["unique_id"] = $i;
                $item["date"] = $sorteditem["date"]->format("Y-m-d");
                if ($item["date_end"] == null || $item["date"] <= DateTime::createFromFormat("Y-m-d H:i", $item["date_end"] . " 00:00"))
                    array_push($records, $item);
                if (count($records) >= $maxrecords)
                    break;
                $i++;
            }
        }

        return response()->json($records);
    }
}
