<?php

namespace util;

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