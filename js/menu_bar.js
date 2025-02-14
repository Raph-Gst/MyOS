const swup = window.swup;

import * as t  from './tab.js';
import * as d  from './scroll_bar.js';

export function tab() {
  t.enableDrag2("top_tab");

  const rectangularBar = document.querySelector('.rectangular-bar');
  
  const height = '30vh';
  const width = '30vw';

  d.updateThumb();

  // Attendre que .screen soit présent dans le DOM
  const observer = new MutationObserver(() => {
    const screen = document.querySelector('.screen');
    const rectangularBar = document.querySelector('.rectangular-bar');
    if (screen && rectangularBar) {
      observer.disconnect(); 
      openFiles(rectangularBar, screen, width, height);
      t.IndexClickApplication('application');
    }
  });

  // Observer le document pour les ajouts d'éléments
  observer.observe(document.body, { childList: true, subtree: true });
}

export function openFiles(rectangularBar, screen, width, height) {
  document.addEventListener('dblclick', async function (e) {
    let menuItem = e.target.closest('.menu_item');

    if (menuItem) {
      
      if (menuItem.id.includes(".")) {
        console.log("La chaîne contient un point.");
        t.createSquare(screen, `${menuItem.id.replace('.', '')}_tab`, `${menuItem.id.replace('.', '')}_icon`, `${menuItem.id}_border_inner_contener`, `${menuItem.id}_inner_contener`, '', width, height, `${menuItem.id}`);
        t.createDiv(`${menuItem.id.replace('.', '')}_icon`, "application", '', rectangularBar, `img/${menuItem.id.replace('.exe', '')}.png`, '', '');
        
      }
      else{
        
        t.createExplorerSquare(screen,`${menuItem.id}_tab`, `id_${menuItem.id}_icon`, `id_${menuItem.id}_border_inner_contener`, `id_${menuItem.id}_inner_contener`, '', width, height, `file explorer`);
        t.createDiv(`id_${menuItem.id}_icon`, "application", '', rectangularBar, `img/directory.png`, '', '');
        
      }
      
    }
  });
}




