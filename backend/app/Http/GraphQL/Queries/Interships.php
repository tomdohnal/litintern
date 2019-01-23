<?php

namespace App\Http\GraphQL\Queries;

use App\Intership;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Interships
{
    /**
     * Searches the interships by given arguments.
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
        $city = isset($args['city']) && !empty($args['city']) ? $args['city'] : null;
        $field = isset($args['field']) && !empty($args['field']) ? $args['field'] : null;
        $text = isset($args['text']) && !empty($args['text']) ? $args['text'] : null;

        return Intership::when($city, function ($query, $city) {
            return $query->where('city', $city);
        })
            ->when($field, function ($query, $field) {
                return $query->where('field', $field);
            })
            ->when($text, function ($query, $text) {
                return $query->where('title', 'like', "%{$text}%")->orWhere('description', 'like', "%{$text}%");
            })
            ->get();
    }
}
