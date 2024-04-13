<?php

namespace controllers;

use util\Response;

require_once "./util/Response.php";

use util\Query;

require_once "./util/Query.php";

use util\Auth;

require_once "./util/Auth.php";

class GetUser
{
    public function __invoke()
    {
        if (!isset($_GET['id']) && !isset($_GET['name'])) {
            return new Response(null, 400);
        }

        $query = new Query();

        if (isset($_GET['id'])) {
            $userId = $_GET['id'];

            $user = $query->getOne("SELECT * FROM user WHERE id = '$userId'");
        } else {
            $userName = $_GET['name'];

            $user = $query->getOne("SELECT * FROM user WHERE name = '$userName'");
        }

        if (!$user) {
            return new Response(null, 404);
        }

        unset($user['password_hash']);
        unset($user['auth_token']);

        return new Response($user, 200);
    }
}