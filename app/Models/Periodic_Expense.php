<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Periodic_Expense extends Model
{
    //
    protected $table = "periodic_expense";

    protected $fillable = ["concept", "date_begin", "date_end", "billing_frequency", "amount", "excludefrom_savingsgoal", "notes", "categoryexpense_id", "appuseraccount_id"];

    use SoftDeletes;
}
