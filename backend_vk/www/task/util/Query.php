<?php

namespace util;

require './db.php';

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