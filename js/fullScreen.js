

export function goFullScreen(minWidth, minHeight, maxWidth, maxHeight, stepWidth, stepHeight) {
    console.log("goFullScreen called");
    const screen = document.querySelector('.screen');
    const screenStart = document.querySelector('.screen_start');
    const TVcadre = document.querySelector('.tele2');
    const effect = document.querySelector('.tele');
     const buttons = document.querySelector('.buttons');
     const rectangularBarTop = document.querySelector('.rectangular-bar-top');
     const fullScreenSlider = document.querySelector('.full_screen');
     
     console.log("fullScreenSlider" + fullScreenSlider);
     if(fullScreenSlider){
        fullScreenSlider.style.opacity = '1';
        fullScreenSlider.style.pointerEvents = 'auto';    
  
     }


    function applyFullScreenStyles(element) {
        if (element) {
            element.style.position = 'absolute';
            element.style.top = '50%';
            element.style.left = '50%';
            element.style.transform = 'translate(-50%, -50%)'; 
            element.style.width = '100%';
            element.style.height = '100%';
            rectangularBarTop.style.top = '0';

        }
    }
    
    if (TVcadre) {
            TVcadre.style.display = 'none'; 
    }
    
    if(buttons) buttons.style.display = 'none';
    
    if (effect) {
        effect.style.width = '100%';
        effect.style.height = '100%';
        effect.style.top = '50%';
        effect.style.left = '50%';
    }

    if (screen) {

        applyFullScreenStyles(screen);

    }

    if (screenStart) {

        applyFullScreenStyles(screenStart);

    }
}