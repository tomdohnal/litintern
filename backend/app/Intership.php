<?php

namespace App;

use App\Application;
use App\Institution;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Intership extends Model
{
    protected $fillable = ['title', 'description', 'city', 'field', 'institution_id'];

    /**
     * An intership belongs to an institution
     *
     * @return BelongsTo
     */
    public function institution(): BelongsTo
    {
        return $this->belongsTo(Institution::class);
    }

    /**
     * An intership has many applications.
     *
     * @return HasMany
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}
