<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $hidden = [
        'delete_flag',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by'
    ];
}
