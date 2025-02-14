const swup = window.swup;

import * as t  from './tab.js';
import * as d  from './scroll_bar.js';

export function tab(){
  t.enableDrag2("top_tab");

  const rectangularBar = document.querySelector('.rectangular-bar');
  const screen = document.querySelector('.screen');
 
  const height = '30vh';
  const width = '30vw';
  
  d.updateThumb();

  openFiles(rectangularBar, screen, width, height);
  t.IndexClickApplication('application');
}

export function openFiles(rectangularBar, screen, width, height) {
  document.addEventListener('dblclick', async function (e) {
    let menuItem = e.target.closest('.menu_item');

    if (menuItem) {
      console.log(menuItem);
    }
  });
}




