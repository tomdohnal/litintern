<?php

namespace App\Http\GraphQL\Mutations;

use App\User;
use Illuminate\Support\Facades\Cookie;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Validator;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class SignUp
{
    /**
     * Signs the user up
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param array $args The arguments that were passed into the field.
     * @param GraphQLContext|null $context Arbitrary data that is shared between all fields of a single query.
     * @param ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     *
     * @return mixed
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
        $validator = Validator::make($args, [
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors());
        }

        $user = User::create([
            'email' => $args['email'],
            'password' => bcrypt($args['password']),
        ]);

        $token = auth()->login($user);

        Cookie::queue('auth_token', $token, null);

        return $user;
    }
}
