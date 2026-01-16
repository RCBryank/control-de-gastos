<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Expense_Record extends Model
{
    //
    protected $table = "expense_record";
    public $fillable = ["concept", "expenserecord_date", "amount", "excludefrom_savingsgoal", "notes", "categoryexpense_id", "appuseraccount_id", "periodicexpense_id"];

    use SoftDeletes;
}
