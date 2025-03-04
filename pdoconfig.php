
<?php

$envVars = parse_ini_file(__DIR__ . '/.env');

foreach ($envVars as $key => $value) {
    putenv("$key=$value");
}

$env = getenv('APP_ENV');
$servername = getenv('DB_HOST');
$database = getenv('DB_NAME');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');


?>