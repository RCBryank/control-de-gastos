<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appuser_Account extends Model
{
    //
    protected $table = "appuser_account";

    protected $fillable = ['name', 'account_number', 'bank', 'description', 'account_balance', 'accounttype_id', 'appuser_id'];
}
