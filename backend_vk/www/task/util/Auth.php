<?php

namespace util;

require_once './util/Query.php';

class Auth {
    public function __invoke($token) {
        $query = new Query();

        return $query->getOne(
            "SELECT * FROM user
                        WHERE auth_token = '$token'"
        );
    }
}
