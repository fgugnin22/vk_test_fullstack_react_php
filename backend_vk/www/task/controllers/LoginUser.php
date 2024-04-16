<?php

namespace controllers;

use Exception;
use util\Response;

require_once "./util/Response.php";

use util\Query;

require_once "./util/Query.php";

use util\Auth;

require_once "./util/Auth.php";


class LoginUser
{
    public function __invoke($jsonData): Response
    {
        return match ($_SERVER["REQUEST_METHOD"]) {
            "POST" => self::post($jsonData),
            "GET" => self::get(),
            default => new Response(null, 400),
        };
    }

    private function post($jsonData): Response
    {
        if ($jsonData === null) {
            return new Response(null, 400);
        }

        $username = $jsonData['name'];

        $query = new Query();

        $user = $query->getOne("SELECT * FROM user WHERE name = '$username'");

        if (!$user) {
            return new Response(null, 401);
        }

        $password = $jsonData['password'];

        if (password_verify($password, $user["password_hash"])) {
            $auth_token = sha1(uniqid(mt_rand(), true));

            $query->execute("UPDATE user SET auth_token = '$auth_token' WHERE name = '$username'");

            return new Response(["auth_token" => $auth_token], 200);
        } else {
            return new Response(null, 401);
        }
    }

    private function get(): Response
    {
        $token = getallheaders()["Authorization"];

        $auth = new Auth();

        $user = $auth($token);

        if (!$user) {
            return new Response(null, 401);
        } else {
            unset($user['password_hash']);
            unset($user['auth_token']);

            return new Response($user, 200);
        }
    }
}