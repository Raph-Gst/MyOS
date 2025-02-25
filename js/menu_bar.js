const swup = window.swup;

import * as t  from './tab.js';
import * as d  from './scroll_bar.js';

export function tab() {
  t.enableDrag2("new-square");
  

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
    let num;

    if (menuItem) {
      
      if (menuItem.id.includes(".")) {
          console.log("La chaîne contient un point.");
          
          // Extraire la partie après le point
          const extension = menuItem.id.split(".")[1]; // Cela récupère la partie après le point
          const appName = menuItem.id.replace(`.`, '');// Remplacer le point pour obtenir le nom de l'application
          const app = menuItem.id; // Utiliser l'ID d'origine pour passer à la fonction
          console.log(app + ' ' + ' ' + extension + ' ' + appName)

          const createFunctionMap = {
            png: t.createPictureSquare,
            blend: t.create3DSquare,
            pdf: t.createPDFSquare,
            txt: t.createTextSquare,
            mp3: t.createMusicSquare
          };
          if (createFunctionMap[extension]) {
            try {
              createFunctionMap[extension](
                screen,
                `${appName}_tab`,
                `${appName}_icon`,
                `${appName}_border_inner_contener`,
                `${appName}_inner_contener`,
                '',
                width,
                height,
                app
              );
            } catch (error) {
              console.error("Erreur lors de la création de la fenêtre :", error);
              num++;
              t.createErrorSquare(screen, `error${num}_tab`, '', `id_error${num}_border_inner_contener`, `id_error${num}_inner_contener`, '', '30', '20', 'error');
            }
          } else {
            try {
              if(appName.replace('exe', '') == 'Github'){
                t.createOtherSquare(screen,
                  `${appName}_tab`,
                  `${appName}_icon`,
                  `${appName}_border_inner_contener`,
                  `${appName}_inner_contener`,
                  '',
                  width,
                  height,
                  app,
                  "https://github.com/zbeubizbeub"
                );
                console.log("Ouvert :", app);
              }else if(appName.replace('exe', '') == 'Linkedin'){
                t.createOtherSquare(screen,
                  `${appName}_tab`,
                  `${appName}_icon`,
                  `${appName}_border_inner_contener`,
                  `${appName}_inner_contener`,
                  '',
                  width,
                  height,
                  app,
                  "https://www.linkedin.com/in/raphael-gosset/"
                );
                console.log("Ouvert :", app);
              }
              t.createSquare(
                screen,
                `${appName}_tab`,
                `${appName}_icon`,
                `${appName}_border_inner_contener`,
                `${appName}_inner_contener`,
                '',
                width,
                height,
                app
              );
              console.log("Ouvert :", app);
            } catch (error) {
              console.error("Erreur lors de l'ouverture du fichier :", error);
              num++;
              t.createErrorSquare(screen, `error${num}_tab`, '', `id_error${num}_border_inner_contener`, `id_error${num}_inner_contener`, '', '30', '20', 'error');
            }
          }
          if(extension !='exe'){
            t.createDiv(`${appName}_icon`, "application", '', rectangularBar, `img/${extension}.png`, '', '');
          }
          else {
            t.createDiv(`${appName}_icon`, "application", '', rectangularBar, `img/${appName.replace(`${extension}`,'')}.png`, '', '');
          }
          
      }
    
      else{
        
        t.createExplorerSquare(screen,`${menuItem.id}_tab`, `id_${menuItem.id}_icon`, `id_${menuItem.id}_border_inner_contener`, `id_${menuItem.id}_inner_contener`, '', width, height, `file explorer`);
        t.createDiv(`id_${menuItem.id}_icon`, "application", '', rectangularBar, `img/directory.png`, '', '');
        
      }
      t.addRecentFiles(menuItem);
      
    }
  });
}







