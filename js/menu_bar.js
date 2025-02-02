const swup = window.swup;

import * as t  from './tab.js';
import * as d  from './scroll_bar.js';

export function tab(){
  t.enableDrag2("new-square");

  const rectangularBar = document.querySelector('.rectangular-bar');
  const screen = document.querySelector('.screen');
 
  const height = '30vh';
  const width = '30vw';
  
  d.updateThumb();

  if ( !rectangularBar || !screen) {
    console.warn("Un ou plusieurs éléments nécessaires (menu-links, rectangular-bar, screen) n'existent pas dans le DOM.");
    return;
  }

  openApp(rectangularBar, screen, width, height);
  t.IndexClickApplication('application');
}

  export function openApp(rectangularBar, screen, width, height) {
   
    document.addEventListener('click', function (e) {
      let appDiv;
      let appID = e.target.id;
      if (e.target.classList.contains('menu_item') && !appID.startsWith("shortcut_folder")) {
        appID = e.target.firstElementChild?.id; 
        
        appDiv =  t.createDiv(`application_${appID}`, "application", " ", rectangularBar, `img/${appID}.png`, null, null);
        if (appDiv) {
          t.createSquare(screen, `application_${appID}_tab`, `application_${appID}`, 'inner-application1', `inner_content_${appID}`,null,  width, height, `${appID}`);
          t.html_injector(`html/${appID}.html`, `inner_content_${appID}`);
        }
        d.update_size_thumbs();
      }
    });
   
  }


