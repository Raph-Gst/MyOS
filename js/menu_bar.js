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
      t.IndexClickApplication('application', rectangularBar);
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
    
    // Extraire la partie après le point
    const extension = menuItem.id.split(".")[1]; // Cela récupère la partie après le point
    const appName = menuItem.id.replace('.', ''); // Remplacer le point pour obtenir le nom de l'application
    const app = menuItem.id; // Utiliser l'ID d'origine pour passer à la fonction

    // Vérifier l'extension et appeler la fonction appropriée
    if (extension === "png") {
        t.createPictureSquare(screen, 
            `${appName}_tab`, 
            `${appName}_icon`, 
            `${appName}_border_inner_contener`, 
            `${appName}_inner_contener`, 
            '', 
            width, 
            height, 
            `${app}`
        );
    } else if (extension === "blend") {
        t.create3DSquare(screen, 
            `${appName}_tab`, 
            `${appName}_icon`, 
            `${appName}_border_inner_contener`, 
            `${appName}_inner_contener`, 
            '', 
            width, 
            height, 
            `${app}`
        );
    } else if (extension === "pdf") {
        t.createPDFSquare(screen, 
            `${appName}_tab`, 
            `${appName}_icon`, 
            `${appName}_border_inner_contener`, 
            `${appName}_inner_contener`, 
            '', 
            width, 
            height, 
            `${app}`
        );
    } else if (extension === "txt") {
        t.createTextSquare(screen, 
            `${appName}_tab`, 
            `${appName}_icon`, 
            `${appName}_border_inner_contener`, 
            `${appName}_inner_contener`, 
            '', 
            width, 
            height, 
            `${app}`
        );
    } else if (extension === "mp3") {
        t.createMusicSquare(screen, 
            `${appName}_tab`, 
            `${appName}_icon`, 
            `${appName}_border_inner_contener`, 
            `${appName}_inner_contener`, 
            '', 
            width, 
            height, 
            `${app}`
        );
    } else {
        t.createSquare(
            screen, 
            `${appName}_tab`, 
            `${appName}_icon`, 
            `${appName}_border_inner_contener`, 
            `${appName}_inner_contener`, 
            '', 
            width, 
            height, 
            `${app}`
        );
        console.log("ouvert : " + app);
    }
    t.createDiv(`${appName}_icon`, "application", '', rectangularBar, `img/${app.replace('.exe', '')}.png`, '', '');
}
    
      else{
        
        t.createExplorerSquare(screen,`${menuItem.id}_tab`, `id_${menuItem.id}_icon`, `id_${menuItem.id}_border_inner_contener`, `id_${menuItem.id}_inner_contener`, '', width, height, `file explorer`);
        t.createDiv(`id_${menuItem.id}_icon`, "application", '', rectangularBar, `img/directory.png`, '', '');
        
      }
      
    }
  });
}






