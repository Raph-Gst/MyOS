import Swup from 'https://unpkg.com/swup@4?module';
const swup = new Swup();


window.swup = swup;

import { tab } from './menu_bar.js';
import { initialize }  from './draggable.js';
import * as t from './transition_page.js';
import { update_file_explorer } from './file_explorer.js';

//valeur pour initialiser la position et des applications et le draggable en vh et vw 

let maxWidth   = 74; 
let minWidth   =  4;
let maxHeight  =  60;
let minHeight  =  5;
let stepHeight =  10;  
let stepWidth  =  8;

////

document.addEventListener('swup:animation:out:start', t.transition_start);
document.addEventListener('swup:animation:in:end', t.transition_end);

document.addEventListener('swup:animation:in:end', () => initialize(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth));
document.addEventListener('DOMContentLoaded', initialize(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth));

document.addEventListener('swup:animation:in:end', tab);
document.addEventListener('DOMContentLoaded', tab);

document.addEventListener('swup:animation:in:end', update_file_explorer);
document.addEventListener('DOMContentLoaded', update_file_explorer);
