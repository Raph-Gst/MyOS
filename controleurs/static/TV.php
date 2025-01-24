<!-- <video id="myVideo" controls loop muted autoplay class="ciel">
    <source  class="video" src="img\cloud.mp4" type="video/mp4">
    Votre navigateur ne prend pas en charge la balise vidéo.
</video> -->

<img class="tele" src="img\tele_catho.png" alt="tele" >
<img class="tele2" src="img\telecool.png" alt="tele" >

<video id="background-video" controls loop muted autoplay class="transparent-video">
    <source class="video" src="img\1076573783-preview_hitpaw.com.mp4" type="video/mp4">
    Votre navigateur ne prend pas en charge la balise vidéo.
</video>

<script>
    document.addEventListener('DOMContentLoaded', function() {

        var videoElement = document.getElementById('background-video');


        if (window.location.href.includes('index.php?page=endoflight')) {

            videoElement.style.opacity = 0;
        }
        else videoElement.style.opacity = 0.05;
    });
</script>