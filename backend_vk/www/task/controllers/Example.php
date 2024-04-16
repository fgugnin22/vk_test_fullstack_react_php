<?php

namespace controllers;

use util\Response;

class Example
{
    public function __invoke($jsonData): Response
    {
        return new Response(["all", "is" => "working"], 200);
    }
}




