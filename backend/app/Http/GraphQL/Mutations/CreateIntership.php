<?php

namespace App\Http\GraphQL\Mutations;

use App\Intership;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class CreateIntership
{
    /**
     * Creates an intership
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
        $institution = auth()->user()->institution;

        if (!$institution) {
            throw new \Exception('You must create an institution first!');
        }

        return Intership::create([
            'title' => $args['title'],
            'description' => $args['description'],
            'city' => $args['city'],
            'field' => $args['field'],
            'institution_id' => $institution->id,
        ]);
    }
}
