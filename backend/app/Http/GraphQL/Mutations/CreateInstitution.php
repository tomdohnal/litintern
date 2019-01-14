<?php

namespace App\Http\GraphQL\Mutations;

use App\Institution;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class CreateInstitution
{
    /**
     * Creates and institution.
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
        $user = auth()->user();

        if ($user->institution) {
            throw new \Exception('You already have an institution!');
        }

        return Institution::create([
            'title' => $args['title'],
            'description' => $args['description'],
            'user_id' => $user->id,
        ]);
    }
}
