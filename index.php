<?php
require('inc/routes.php');
require_once('modele/modele.php');

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>TéléDemande</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
    <link href="css/home.css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="img/favicon.ico">

    
</head>
<body>
    <?php include($pathTV); ?>
    <?php include($pathTVButtons); ?>
    <div id="swup" class="transition-fade" data-swup>
        
        <?php
            $controleur = $controleurStart;
            $vue = $vueStart;

            if(isset($_GET['page'])) {
                $nomPage = $_GET['page'];
                if(isset($routes[$nomPage])) {
                    $controleur = $routes[$nomPage]['controleur'];
                    $vue = $routes[$nomPage]['vue'];
                }
            }

			if($vue != $routes['accueil']['vue'] && $vue != $routes['endoflight']['vue'] && $vue != $vueStart){
                include($pathHeader); 
            }

        ?>

        <div id="divCentral">
            <main>
                <?php
                include('controleurs/' . $controleur . '.php');
                include('vues/' . $vue . '.php');
                ?>
            </main>
        </div>

        
    </div>
    <video id="transition-video" class="transition-video" width="600" muted>
        <source src="img/transition_video.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <script type="module" src="js/main.js" ></script>

</body>
</html>