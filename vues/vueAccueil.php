
<div class="screen">
    
    <div class="full_screen" id="full_screen_slider">
        <div id="exit_menu" class="dropdown-content">
            <div class="exit_fullscreen_container">
                <div id="exit_fullscreen"></div>
                <div id="exit_fullscreen_name">Exit FullScreen</div>
            </div>
        </div>
    </div>
    
    <div id="eye_widget" class="widget" >
        <div class="top_widget">
            <div class="close-btn" onclick="document.getElementById('eye_widget').remove();"></div>
            <div class="application_name">eye_widget</div>
        </div>
        <div id="eye_border_inner_contener" class="border-inner-contener" style="background-color: #EFEFEF;">
            <div class="content" id="content_eye_widget" style="height: 100%; width: 100%;">
                <img src="img/eye_gif.gif" alt="Eye GIF" style="height: 100%; width: 100%; object-fit: fill; z-index : 2;">
                <div style="position: absolute; top: 55%; left: 45%; transform: translate(-50%, -50%); height: 20%; width: 20%;">
                    <img src="img/eye.png" id="eye" style="height: 100%; width: 100%; object-fit: fill;">
                </div>
            </div>
        </div>
    </div>
    <div class="rectangular-bar" >
   
        <div id="id_Home_icon" class="application"></div>

        <!-- Divs avec une bordure à droite -->
        <div class="additional-container" style="border-right: 2px solid rgb(239, 239, 239); height: 80%; margin-left: 0.5vw; display: flex; align-items: center;    box-shadow: 
        
        1px 1px 0px rgba(0, 0, 0, 1),
        -1px -1px 0px rgb(130, 130, 130);"></div>
        <div class="additional-container" style="border-right: 2px solid rgb(238, 238, 238); height: 80%; margin-left: 0.2vw; margin-right: 0.4vw; display: flex; align-items: center;    box-shadow: 
        
        1px 1px 0px rgba(0, 0, 0, 1),
        -1px -1px 0px rgb(124, 124, 124);"></div>

    </div>


    <div class="rectangular-bar-top">
        <img src="img/logo_start_menu_os.png" alt="Logo OS" class="logo-os" id="logo-os">

        <div class="additional-container2" style="border-right: 1px solid rgb(239, 239, 239); height: 80%; margin-left: 3vw; display: flex; align-items: center;    box-shadow: 
        
        1px 1px 0px rgba(0, 0, 0, 1),
        -1px -1px 0px rgb(130, 130, 130);"></div>
        <div class="name_container" id="name_container_button">
            <div class="name"> Raphaël Gosset </div>
            <div class="arrow_slide"></div>
            <div class="dropdown_menu" id="raph_dropdown">
                <div class="profile_image_contener"></div>
                <p>Raphaël Gosset</p>
            </div>
        </div>
        <div class="name_container" id="name_container_button2">
            <div class="name"> Start </div>
            <div class="arrow_slide"></div>
            <div id="start_menu" class="dropdown-content">
                <div class="recent_files"></div>
                <div id="shutdown">
                <img src="img/shutdown.png" >
            </div>
            
        </div>
        </div>
        
        <div class="datetime" id="datetime"></div>
    </div>       
</div>






