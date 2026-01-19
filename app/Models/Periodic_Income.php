<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Periodic_Income extends Model
{
    //
    protected $table = "periodic_income";

    protected $fillable = ["concept", "date_begin", "date_end", "income_frequency", "amount", "excludefrom_savingsgoal", "notes", "categoryincome_id", "appuseraccount_id"];

    use SoftDeletes;
}
