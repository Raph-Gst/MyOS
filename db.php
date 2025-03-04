<?php
require_once 'pdoconfig.php'; 

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $queryFolders = "SELECT * FROM folders";
    $stmtFolders = $conn->prepare($queryFolders);
    $stmtFolders->execute();
    $folders = $stmtFolders->fetchAll(PDO::FETCH_ASSOC);

    $queryFiles = "SELECT * FROM files";
    $stmtFiles = $conn->prepare($queryFiles);
    $stmtFiles->execute();
    $files = $stmtFiles->fetchAll(PDO::FETCH_ASSOC);

    $data = [
        'folders' => $folders,
        'files' => $files
    ];

    // Créer un fichier JSON
    file_put_contents('data.json', json_encode($data));

} catch (PDOException $pe) {
    die("Could not connect to the database $dbname: " . $pe->getMessage());
}
?>
