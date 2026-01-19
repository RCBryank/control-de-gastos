<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Income_Record extends Model
{
    //
    protected $table = "income_record";

    protected $fillable = ["concept", "incomerecord_date", "amount", "excludefrom_savingsgoal", "notes", "categoryincome_id", "appuseraccount_id", "periodicincome_id"];

    use SoftDeletes;
}
