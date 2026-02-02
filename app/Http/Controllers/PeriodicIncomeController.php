<?php

namespace App\Http\Controllers;

use App\Models\Periodic_Income;
use Carbon\Traits\ToStringFormat;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function PHPUnit\Framework\isEmpty;
use function Symfony\Component\Clock\now;

class PeriodicIncomeController extends Controller
{
    //
    public function getfromuser()
    {
        $user = Auth::user();

        $results  = Periodic_Income::select("periodic_income.id", "concept", "date_begin", "date_end", DB::raw("income_frequency as 'frequency'") , "amount", "excludefrom_savingsgoal", "notes", "category_income.name as category_name")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->join("category_income", "category_income.id", "categoryincome_id")
            ->where("appuser_id", $user->id)
            ->orderBy("periodic_income.id", "asc")
            ->get()->toArray();

        return response()->json($results);
    }

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

    public function edit($id)
    {
        $user = Auth::user();

        $record = Periodic_Income::select("periodic_income.id", "concept", "date_begin", "date_end", "income_frequency", "amount", "excludefrom_savingsgoal", "notes", "categoryincome_id", "appuseraccount_id")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->where("periodic_income.id", $id)->where("appuser_account.appuser_id", $user->id)
            ->firstOrFail();

        return Inertia::render('edit-periodicincome', ["preloadeddata" => $record->toArray()]);
    }

    public function update($id)
    {
        $request = request();

        $user = Auth::user();
        $recordid = $id;

        $incomerecord = Periodic_Income::select("appuser_id")
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->find($recordid);

        if (isset($incomerecord)) {
            if ($incomerecord->appuser_id == $user->id) {
                Periodic_Income::findOrFail($recordid)->update([
                    "concept" => $request->input("input-concept"),
                    "date_begin" => $request->input("date-date_begin"),
                    "date_end" => $request->input("date-date_end"),
                    "income_frequency" => $request->input("input-income_frequency"),
                    "amount" => $request->input("input-amount"),
                    "excludefrom_savingsgoal" => $request->input("checkbox-excludefrom_savingsgoal") ? true : false,
                    "notes" => $request->input("input-notes"),
                    "categoryincome_id" => $request->input("select-categoryincome_id"),
                    "appuseraccount_id" => $request->input("select-appuseraccount_id")
                ]);
            } else {
                //- El registro no pertenece a una cuenta asociada al usuario
                return redirect()->back("ingresosperiodicos")->withErrors(["Autorizacion" => "El registro no es del usuario autenticado"]);
            }
        } else {
            //-- No existe el registro 
        }

        return redirect()->to("ingresosperiodicos")->with("success");
    }

    public function delete(Request $request)
    { //-- Validaciones
        $periodicincomerecordids = $request->input("input-recordids", []);

        $user = Auth::user();

        foreach ($periodicincomerecordids as $recordid) {
            $periodicincomerecord = Periodic_Income::select("appuser_id")
                ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
                ->find($recordid);

            if (isset($periodicincomerecord)) {
                if ($periodicincomerecord->appuser_id == $user->id) {
                    Periodic_Income::destroy($recordid);
                } else {
                    //- El registro no pertenece a una cuenta asociada al usuario
                    return redirect()->back("ingresos")->withErrors(["Autorizacion" => "El registro no es del usuario autenticado"]);
                }
            } else {
                //-- No existe el registro 
            }
        }

        return redirect()->to("ingresosperiodicos")->with("success");
    }

    public function getnextperiodicincomes()
    {
        $user = Auth::user();
        $today = date("Y-m-d");

        //-- Obten todos los registros cuyas fechas inicios sean antes del dia actual y sus fechas finales sean null o despues del dia de hoy
        $periodicrecords = Periodic_Income::select("periodic_income.id", "concept", "amount", "income_frequency", "date_begin", "date_end", DB::raw("appuser_account.name as accountname"))
            ->join("appuser_account", "appuser_account.id", "appuseraccount_id")
            ->where("appuser_id", $user->id)
            ->whereRaw("(date_end >= '$today' OR date_end is NULL)")
            ->orderBy("income_frequency", "ASC")
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

                $step = abs(ceil($daysdiff / $record["income_frequency"]));
                $closesdatetotoday =  $today < $daterecord ? $daterecord : date_add(DateTime::createFromFormat("Y-m-d H:i", $record["date_begin"] . " 00:00"), date_interval_create_from_date_string(($step * $record["income_frequency"]) . " days"));

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
                    $dateresult = date_add(DateTime::createFromFormat("Y-m-d H:i", $record["date_begin"] . " 00:00"), date_interval_create_from_date_string(($record["income_frequency"] * ($initialstep + $i))  . " days"));
                    $item = ["index" => $e, "date" => $dateresult];
                    array_push($arrayDatestoSort, $item);
                }
            }

            array_multisort(array_column($arrayDatestoSort, 'date'), SORT_ASC, $arrayDatestoSort);

            foreach ($arrayDatestoSort as $sorteditem) {
                $item = $arrayrecords[$sorteditem["index"]];
                $item["date"] = $sorteditem["date"]->format("Y-m-d");
                if ($item["date_end"] == null || $item["date"] <= DateTime::createFromFormat("Y-m-d H:i", $item["date_end"] . " 00:00"))
                    array_push($records, $item);
                if (count($records) >= $maxrecords)
                    break;
            }

        }

        return response()->json($records);
    }
}
