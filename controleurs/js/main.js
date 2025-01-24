import Swup from 'https://unpkg.com/swup@4?module';
const swup = new Swup();


window.swup = swup;

import { tab } from './menu_bar.js';
import * as d  from './draggable.js';
import * as t from './transition_page.js';

document.addEventListener('swup:animation:out:start', t.transition_start);
document.addEventListener('swup:animation:in:end', t.transition_end);

document.addEventListener('swup:animation:in:end', d.initialize);
document.addEventListener('DOMContentLoaded', d.initialize);

document.addEventListener('swup:animation:in:end', tab);
document.addEventListener('DOMContentLoaded', tab);

