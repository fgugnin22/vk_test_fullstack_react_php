<?php

namespace controllers;

use Exception;
use util\Response;

require_once "./util/Response.php";

use util\Query;

require_once "./util/Query.php";

class RegisterUser
{
    public function __invoke($jsonData): Response
    {
        if ($jsonData === null) {
            return new Response(null, 400);
        }

        $username = $jsonData["name"];
        $password = $jsonData["password"];

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $query = new Query();

        try {
            $query->execute("INSERT INTO user (name, password_hash) 
                    VALUES ('$username', '$hash')");

            $id = $query->getOne("SELECT LAST_INSERT_ID()")["LAST_INSERT_ID()"];

            $new_user = $query->getOne("SELECT id, name FROM user WHERE id = '$id'");

            return new Response($new_user, 200);
        } catch (Exception $e) {
            return new Response($e, 500);
        }


    }
}
