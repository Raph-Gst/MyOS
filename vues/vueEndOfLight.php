<img id="end" class="end" src="img/tv_off.gif" alt="Transition Image">

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