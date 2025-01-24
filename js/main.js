import Swup from 'https://unpkg.com/swup@4?module';
const swup = new Swup();


window.swup = swup;

import { tab } from './menu_bar.js';
import * as d  from './draggable.js';
import * as t from './transition_page.js';

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

document.addEventListener('swup:animation:in:end', d.initialize(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth));
document.addEventListener('DOMContentLoaded', d.initialize(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth));

document.addEventListener('swup:animation:in:end', tab);
document.addEventListener('DOMContentLoaded', tab);


