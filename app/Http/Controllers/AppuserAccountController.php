<?php

namespace App\Http\Controllers;

use App\Models\Appuser_Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppuserAccountController extends Controller
{
    //
    public function get()
    {
        $user = Auth::user();

        $accounts = Appuser_Account::select("name", "account_balance")
            ->where("appuser_id", $user->id)
            ->get()->toArray();

        return response()->json($accounts);
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
