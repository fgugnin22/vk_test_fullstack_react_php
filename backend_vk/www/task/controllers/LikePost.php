<?php
namespace controllers;

use Exception;
use util\Response;

require_once "./util/Response.php";

use util\Query;

require_once "./util/Query.php";

use util\Auth;

require_once "./util/Auth.php";

class LikePost
{
    public function __invoke($jsonData)
    {
        $token = getallheaders()["Authorization"];

        $auth = new Auth();

        $user = $auth($token);

        if (!$user) {
            return new Response(null, 401);
        }

        if ($jsonData === null) {
            return new Response(null, 400);
        }

        $postId = $jsonData["post_id"];

        $userId = $user["id"];

        $query = new Query();

        $exists = $query->getOne(
            "SELECT count(*) as count FROM reaction 
                        WHERE post_id = $postId AND user_id = $userId"
        )["count"];

        if ($exists) {
            $query->execute("DELETE FROM reaction WHERE post_id = $postId AND user_id = $userId");

            return new Response("disliked", 200);
        } else {
            $query->execute("INSERT INTO reaction (user_id, post_id) VALUES ($userId, $postId)");

            return new Response("liked", 200);
        }

    }
}
