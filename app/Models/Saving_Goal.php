<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Saving_Goal extends Model
{
    //
    protected $table = "saving_goal";

    protected $fillable = ["name", "date_begin", "date_end", "target_amount", "appuseraccount_id"];

    use SoftDeletes;
}
