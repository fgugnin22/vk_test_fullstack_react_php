<?php

namespace controllers;

use Exception;
use util\Response;
require_once "./util/Response.php";

use util\Query;
require_once "./util/Query.php";

use util\Auth;
require_once "./util/Auth.php";

class Post {
    public function __invoke()
    {
        return match ($_SERVER["REQUEST_METHOD"]) {
            "POST" => self::create(),
            "GET" => self::list(),
            "DELETE" => self::delete(),
            default => new Response(null, 400),
        };
    }

    private function create(): Response
    {
        $body = file_get_contents('php://input');

        $jsonData = json_decode($body, true);

        if ($jsonData === null) {
            return new Response(null, 400);
        }

        $token = getallheaders()["Authorization"];

        $auth = new Auth();

        $user = $auth($token);

        if (!$user) {
            return new Response(null, 401);
        }

        $postContent = $jsonData['content'];
        $authorId = $jsonData['author_id'];

        $query = new Query();

        $query->execute("INSERT INTO post (content, author_id) VALUES ('$postContent', '$authorId')");

        $id = $query->getOne("SELECT LAST_INSERT_ID()")["LAST_INSERT_ID()"];

        $post = $query->getOne("SELECT * FROM post WHERE id = $id");

        return new Response($post, 200);
    }

    private function list(): Response
    {
        if (isset($_GET["author_id"])) {
            return self::get_user_posts();
        } else {
            return self::list_all();
        }
    }


    private function get_user_posts(): Response {
        $userId = $_GET["author_id"];

        $query = new Query();

        $posts = $query->getAll(
            "SELECT author_id, content, id, count(post_id) as likes_amount FROM post 
                        JOIN reaction r on post.id = r.post_id
                        WHERE author_id = $userId
                        GROUP BY post_id"
        );

        return new Response($posts, 200);
    }

    private function list_all(): Response {
        $query = new Query();

        $posts = $query->getAll(
            "SELECT author_id, content, id, count(post_id) as likes_amount FROM post 
                        JOIN reaction r on post.id = r.post_id
                        GROUP BY post_id"
        );

        return new Response($posts, 200);
    }

    private function delete(): Response {
        $token = getallheaders()["Authorization"];

        $auth = new Auth();

        $user = $auth($token);

        if (!$user) {
            return new Response(null, 401);
        }

        $body = file_get_contents('php://input');

        $jsonData = json_decode($body, true);

        if ($jsonData === null || !isset($jsonData["post_id"])) {
            return new Response(null, 400);
        }

        if ($jsonData['author_id'] != $user["id"]) {
            return new Response(null, 401);
        }

        $query = new Query();

        $userId = $user['id'];

        $postId = $jsonData['post_id'];

        $query->execute("DELETE FROM post WHERE author_id = $userId AND id = $postId");

        return new Response(null, 204);
    }
}