<?php

namespace App;

use App\User;
use App\Intership;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Institution extends Model
{
    protected $fillable = ['title', 'description', 'user_id'];

    /**
     * Institution has one administrator.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Institution has many interships.
     *
     * @return HasMany
     */
    public function interships(): HasMany
    {
        return $this->hasMany(Intership::class);
    }
}
