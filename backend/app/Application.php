<?php

namespace App;

use App\Intership;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    protected $fillable = ['text', 'email', 'intership_id'];

    /**
     * An application belongs to an intership
     *
     * @return BelongsTo
     */
    public function intership(): BelongsTo
    {
        return $this->belongsTo(Intership::class);
    }

}
