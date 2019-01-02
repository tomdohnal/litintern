<?php

namespace App\Http\GraphQL;

class Query {
    public function interships($parent, array $args)
    {
        return Interships::all();
    }
}
