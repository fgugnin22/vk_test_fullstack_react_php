<?php


require "./controllers/Example.php";
require "./controllers/RegisterUser.php";
require "./controllers/LoginUser.php";
require "./controllers/Post.php";
require "./controllers/LikePost.php";

class Api
{
  const base_path = "/api";

  const routes = [
      '/example' => \controllers\Example::class,
      '/user/register' => \controllers\RegisterUser::class,
      '/user/login' => \controllers\LoginUser::class,
      '/posts' => \controllers\Post::class,
      '/posts/like' => \controllers\LikePost::class,
  ];

  public static function init(): void
  {
    $uri = $_SERVER['REQUEST_URI'];

    if (str_starts_with($uri, self::base_path)) {
      $path = strtok(str_replace(self::base_path, "", $uri), '?');

      header('Content-Type: application/json; charset=utf-8');

      $controller = new (self::routes[$path])();

      $response = $controller();

      echo $response->get_body();
    }
  }
}
