<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS
    |--------------------------------------------------------------------------
    |
    | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
    | to accept any value.
    |
    */
   
    'supportsCredentials' => true,
    'allowedOrigins' => ['http://localhost:3000'],
    'allowedOriginsPatterns' => [],
    'allowedHeaders' => ['*'],
    'allowedMethods' => [
        'POST',
        'GET',
        'OPTIONS',
        'PUT',
        'PATCH',
        'DELETE',
    ],
    'exposedHeaders' => [],
    'maxAge' => 0,

];
