<img id="end" class="end" src="img/tv_off.gif" alt="Transition Image">
<div class="full_screen" id="full_screen_slider">
    <div id="exit_menu" class="dropdown-content">
        <div class="exit_fullscreen_container">
            <div id="exit_fullscreen"></div>
            <div id="exit_fullscreen_name">Exit FullScreen</div>
        </div>
    </div>
</div>
<div class="tv_off">

</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    var img = document.getElementById('end');
    setTimeout(function() {
        img.classList.add('hidden');
    },600); 
});
</script>