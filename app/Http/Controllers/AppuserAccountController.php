<?php

namespace App\Http\Controllers;

use App\Models\Appuser_Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AppuserAccountController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        $userid = $user->id;

        $accounts = DB::select("SELECT appuser_account.id, name, account_balance, concept, recorddate
                                from appuser_account
                                LEFT JOIN ( SELECT record.accountid, MAX(concept) as 'concept', MAX(recorddate) as 'recorddate' from (
                                        select MAX(concept) as 'concept', MAX(expenserecord_date) as 'recorddate', appuseraccount_id as 'accountid'
                                        from expense_record
                                        GROUP BY appuseraccount_id
                                        UNION 
                                        SELECT MAX(concept) as 'concept', MAX(incomerecord_date) as 'recorddate', appuseraccount_id as 'accountid' 
                                        from income_record
                                        GROUP BY appuseraccount_id) as record
                                    GROUP BY record.accountid) as rec on rec.accountid = appuser_account.id
                                WHERE appuser_id = $userid");


        return Inertia::render('accounts', ["accounts" => $accounts]);
    }


    public function get()
    {
        $user = Auth::user();
        $userid = $user->id;

        $accounts = DB::select("SELECT name, account_balance, concept, recorddate
                                from appuser_account
                                LEFT JOIN ( SELECT record.accountid, MAX(concept) as 'concept', MAX(recorddate) as 'recorddate' from (
                                        select MAX(concept) as 'concept', MAX(expenserecord_date) as 'recorddate', appuseraccount_id as 'accountid'
                                        from expense_record
                                        GROUP BY appuseraccount_id
                                        UNION 
                                        SELECT MAX(concept) as 'concept', MAX(incomerecord_date) as 'recorddate', appuseraccount_id as 'accountid' 
                                        from income_record
                                        GROUP BY appuseraccount_id) as record
                                    GROUP BY record.accountid) as rec on rec.accountid = appuser_account.id
                                WHERE appuser_id = $userid");

        return response()->json($accounts);
    }

    public function getLastActivityfromAccounts()
    {
        $user = Auth::user();
        $userid = $user->id;

        $accounts = DB::select("SELECT record.accountid as appuseraccount_id, MAX(concept) as 'concept', 50 as 'amount', MAX(recorddate) as 'recorddate' 
                                from (
                                    select MAX(concept) as 'concept', MAX(expenserecord_date) as 'recorddate', appuseraccount_id as 'accountid'
                                    from expense_record
                                    GROUP BY appuseraccount_id
                                    UNION 
                                    SELECT MAX(concept) as 'concept', MAX(incomerecord_date) as 'recorddate', appuseraccount_id as 'accountid' 
                                    from income_record
                                    GROUP BY appuseraccount_id) as record
                                INNER JOIN appuser_account on appuser_account.id = record.accountid
                                WHERE appuser_account.appuser_id = $userid
                                GROUP BY record.accountid;") ;

        return response()->json($accounts);
    }

    public function getWeeklyBalance()
    {
        $user = Auth::user();
        $userid = $user->id;

        $indexweekcurrentday = date("w");
        $daystofinishweek = 6 - $indexweekcurrentday;
        $currentdate = date_create_from_format("Y-m-d H:i:s", date("Y-m-d") . "00:00:00");
        $enddate = clone($currentdate);
        $startdate = clone($currentdate);
        $startdate->modify("-$indexweekcurrentday days");
        $enddate->modify("+$daystofinishweek days");

        $formatstartweek = $startdate->format("Y-m-d");
        $formatendweek = $enddate->format("Y-m-d");

        $weeklybalance = DB::select("SELECT MAX(balances.appuseraccount_id) as appuseraccount_id, SUM(balances.balance) as finalbalance from (
                                        SELECT MAX(appuser_account.id) as appuseraccount_id, (SUM(amount) * -1) as balance
                                            from expense_record
                                            inner join appuser_account on appuser_account.id = appuseraccount_id
                                            WHERE appuser_account.appuser_id = $userid AND expenserecord_date BETWEEN '$formatstartweek 00:00:00' AND '$formatendweek 23:59:59'
                                            GROUP BY appuser_account.id
                                        UNION
                                        SELECT MAX(appuser_account.id) as appuseraccount_id, SUM(amount) as balance
                                            from income_record
                                            inner join appuser_account on appuser_account.id = appuseraccount_id
                                            WHERE appuser_account.appuser_id = $userid AND incomerecord_date BETWEEN '$formatstartweek 00:00:00' AND '$formatendweek 23:59:59'
                                            GROUP BY appuser_account.id
                                    ) as balances
                                    GROUP BY balances.appuseraccount_id");

        return response()->json($weeklybalance);
    }

    public function getMonthlyBalance()
    {
        $user = Auth::user();
        $userid = $user->id;

        $currentdate = date_create_from_format("Y-m-d H:i:s", date("Y-m-d") . "00:00:00");
        $formatcurrentdate = $currentdate->format("Y-m-d");

        $monthlybalance = DB::select("SELECT MAX(balances.appuseraccount_id) as appuseraccount_id, SUM(balances.balance) as finalbalance from (
                                        SELECT MAX(appuser_account.id) as appuseraccount_id, (SUM(amount) * -1) as balance
                                                from expense_record
                                                inner join appuser_account on appuser_account.id = appuseraccount_id
                                                WHERE appuser_account.appuser_id = $userid AND MONTH(expenserecord_date) = MONTH('$formatcurrentdate')
                                                GROUP BY appuser_account.id
                                            UNION
                                            SELECT MAX(appuser_account.id) as appuseraccount_id, SUM(amount) as balance
                                                from income_record
                                                inner join appuser_account on appuser_account.id = appuseraccount_id
                                                WHERE appuser_account.appuser_id = $userid AND MONTH(incomerecord_date) = MONTH('$formatcurrentdate')
                                                GROUP BY appuser_account.id) as balances
                                    GROUP BY balances.appuseraccount_id");

        return response()->json($monthlybalance);
    }

    public function getfromuser()
    {
        $user = Auth::user();

        $results = Appuser_Account::select('id', 'name')
            ->where('appuser_id', $user->id)
            ->get()->toArray();

        return response()->json($results);
    }

    public function store(Request $request)
    {
        //-- Validacion valores del form
        $user = Auth::user();

        //-- Guardado de valores
        $account = Appuser_Account::create([
            "name" => $request->post("input-name"),
            "account_number" => $request->post("input-account_number"),
            "bank" => $request->post("bank"),
            "description" => $request->post("input-description"),
            "account_balance" => $request->post("input-account_balance"),
            "accounttype_id" => $request->post("input-accounttype_id"),
            "appuser_id" => $user->id
        ]);

        return redirect()->to('/miscuentas')->with('success', $request->post("input-name"));
    }
}
