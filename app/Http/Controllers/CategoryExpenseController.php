<?php

namespace App\Http\Controllers;

use App\Models\Category_Expense;
use Illuminate\Http\Request;

class CategoryExpenseController extends Controller
{
    public function all()
    {
        $results = Category_Expense::select("id", "name")->get()->toArray();

        return response()->json($results);
    }
}
