<?php

namespace util;

require_once './util/Query.php';

class Auth {
    public function __invoke($token) {
        $query = new Query();

        $user = $query->getOne(
            "SELECT * FROM user
                        WHERE auth_token = '$token'"
        );

        return $user;
    }
}
