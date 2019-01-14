<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Institution extends Model
{
    protected $fillable = ['title', 'description', 'user_id'];

    /**
     * Institution has one administrator.
     *
     * @return boolean
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
