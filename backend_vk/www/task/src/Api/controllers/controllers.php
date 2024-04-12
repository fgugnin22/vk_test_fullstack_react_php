<?php

namespace src\Api\controllers;

use PDO;


$host = 'mysql';
$db = 'task';
$user = 'root';
$pass = '';
$charset = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$opt = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::ERRMODE_WARNING => true,
];

global $pdo;
$pdo = new PDO($dsn, $user, $pass, $opt);



class Query
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = $GLOBALS['pdo'];
    }

    public function getAll(string $query_string)
    {
        return $this->pdo->query($query_string)->fetchAll();
    }

    public function getOne(string $query_string)
    {
        $query = $this->pdo->query($query_string);

        $res = $query->fetch();

        $query->closeCursor();

        return $res;
    }

    public function execute(string $query_string)
    {
        return $this->pdo->exec($query_string);
    }
}


class Response
{
    private $body;
    private $code;


    public function __construct(mixed $body, int $code)
    {
        $this->body = $body;
        $this->code = $code;

    }

    public function get_body(): string|bool
    {
        http_response_code($this->code);

        return json_encode($this->body);
    }
}


class Example
{
    public function __invoke()
    {
        return new Response(["all", "is"=>"working"], 200);
    }
}




