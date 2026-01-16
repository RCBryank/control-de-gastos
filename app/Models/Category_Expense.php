<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category_Expense extends Model
{
    //
    protected $table = "category_expense";

    protected $fillable = ["id", "name"];
}
