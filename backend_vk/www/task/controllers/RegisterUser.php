<?php

namespace controllers;

use util\Response;
require "./util/Response.php";

class RegisterUser
{
    public function __invoke()
    {
        return new Response(["all", "is"=>"working"], 200);
    }
}
