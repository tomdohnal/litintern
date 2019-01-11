<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use Tymon\JWTAuth\Token;
use Tymon\JWTAuth\Facades\JWTAuth;

class CookieLogin
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
        $token = $request->cookie('auth_token');
        if ($token) {
            $payload = JWTAuth::decode(new Token($token));
            
            $userId = $payload['sub'];

            if ($userId) {
                $user = User::find($userId);

                if ($user) {
                    auth()->login($user);
                }
            }
        }
        return $next($request);
    }
}
