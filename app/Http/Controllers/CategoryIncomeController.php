<?php

namespace App\Http\Controllers;

use App\Models\Category_Income;
use Illuminate\Http\Request;

class CategoryIncomeController extends Controller
{
    //
    public function all()
    {
        $results = Category_Income::select("id", "name")->get()->toArray();

        return response()->json($results);
    }
}
