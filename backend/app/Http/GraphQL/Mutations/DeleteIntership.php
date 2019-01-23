<?php

namespace App\Http\GraphQL\Mutations;

use App\Intership;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class DeleteIntership
{
    /**
     * Return a value for the field.
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
        $intership = Intership::find($args['id']);

        if (!$intership) {
            throw new \Exception('There is no such an intership.');
        }

        if ($intership->institution->id !== auth()->user()->institution->id) {
            throw new \Exception('You are not allowed to delete this intership.');            
        }

        $intership->delete();

        return $intership;
    }
}
