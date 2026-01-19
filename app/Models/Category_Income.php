<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category_Income extends Model
{
    //
    protected $table = "category_income";

    use SoftDeletes;
}
