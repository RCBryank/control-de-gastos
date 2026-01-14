<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avatar extends Model
{
    //
    protected $table = "avatar";

    protected $fillable = ['filename', 'public_path', 'filesize'];

    public $timestamps = false;
}
