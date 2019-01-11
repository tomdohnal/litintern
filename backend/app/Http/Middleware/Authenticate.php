<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use Tymon\JWTAuth\Token;
use Tymon\JWTAuth\Facades\JWTAuth;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!auth()->user()) {
            throw new \Exception('You must authenticate in order to proceed.');
        }
        return $next($request);
    }
}
