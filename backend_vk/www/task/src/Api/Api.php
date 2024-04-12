<?php

namespace src\Api;

use Task\Controllers\Example;

require_once "controllers/controllers.php";

class Api
{
  const base_path = "/api";

  const routes = [
    '/example' => Example::class,
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
