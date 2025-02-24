import Swup from 'https://unpkg.com/swup@4?module';
const swup = new Swup();

import {MoveCursor}  from './custom_cursor.js';

window.swup = swup;

import * as m from './menu_bar.js';
import { initialize } from './draggable.js';
import * as t from './transition_page.js';
import * as d from './desktopHandler.js';



// Valeurs pour initialiser la position et le draggable en vh et vw 
let maxWidth   = 74; 
let minWidth   =  4;
let maxHeight  = 60;
let minHeight  =  5;
let stepHeight = 10;  
let stepWidth  =  8;








function init(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth) {

    
    MoveCursor();
    d.updateDateTime();

    d.generateDesktopMenu().then(() => {

        initialize(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth); 

    });

    
    
    // Appeler m.tab() après le chargement du DOM

}

document.addEventListener('swup:animation-out-start', t.transition_start);
document.addEventListener('swup:animation-in-end', t.transition_end);

if (document.readyState === 'complete') {
    
    init(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth);
    m.tab(); // Déplacez ici pour qu'il ne soit appelé qu'après le chargement du DOM
} else {
    document.addEventListener('DOMContentLoaded', () => {
        
        init(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth);
        m.tab(); // Déplacez ici pour qu'il ne soit appelé qu'après le chargement du DOM
    });
}

if (swup?.hooks?.on) {
    swup.hooks.on('page:view', () => {
        init(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth);
        
    }

    );
}  
