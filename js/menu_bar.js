const swup = window.swup;

import * as t  from './tab.js';
import * as d  from './scroll_bar.js';

export function tab(offSetX, offSetY, height, width, isMobile) {
  
  if(!isMobile) t.enableDrag2("new-square", offSetX, offSetY);



  d.updateThumb();
  


  const observer = new MutationObserver(() => {
    const screen = document.querySelector('.screen');
    const rectangularBar = document.querySelector('.rectangular-bar');
    if (screen && rectangularBar) {
      observer.disconnect(); 
      openFiles(rectangularBar, screen, width, height, isMobile);
      t.IndexClickApplication('application', rectangularBar);
      t.OpenApplicationTarget(rectangularBar);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

export function openFiles(rectangularBar, screen, width, height, isMobile) {
  let lastClickTime = 0;
 

  const handleClick = async (e) => {
    let menuItem = e.target.closest('.menu_item');
    let num;

    if (menuItem) {
      if (menuItem.id.includes(".")) {
        console.log("La chaîne contient un point.");

        const extension = menuItem.id.split(".")[1];
        const appName = menuItem.id.replace('.', '');
        const app = menuItem.id;
        console.log(app + ' ' + ' ' + extension + ' ' + appName)

        const createFunctionMap = {
          png: t.createPictureSquare,
          blend: t.create3DSquare,
          pdf: t.createPDFSquare,
          txt: t.createTextSquare,
          mp3: t.createMusicSquare,
          glsl: t.createGLSLSquare
        };
        
        if (createFunctionMap[extension]) {
          try {
            createFunctionMap[extension](
              screen,
              `${appName}_tab`,  // Ajout des guillemets pour la chaîne interpolée
              `${appName}_icon`,
              `${appName}_border_inner_contener`,
              `${appName}_inner_contener`,
              '',
              width,
              height,
              app
            );
            console.log("Ouvert extension:", app);
          } catch (error) {
            console.error("Erreur lors de la création de la fenêtre :", error);
            num++;
            t.createErrorSquare(screen, `error${num}_tab`, '', `id_error${num}_border_inner_contener`, `id_error${num}_inner_contener`, '', '30', '20', 'error');
          }
        } else {
          try {
            if (appName.replace('exe', '') == 'Github') {
              t.createOtherSquare(
                screen,
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
              console.log("Ouvert exe:", app);
            } else if (appName.replace('exe', '') == 'Linkedin') {
              t.createOtherSquare(
                screen,
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
              console.log("Ouvert exe:", app);
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
            console.log("Ouvert random:", app);
          } catch (error) {
            console.error("Erreur lors de l'ouverture du fichier :", error);
            num++;
            t.createErrorSquare(screen, `error${num}_tab`, '', `id_error${num}_border_inner_contener`, `id_error${num}_inner_contener`, '', '30', '20', 'error');
          }
        }
        
        if (extension !== 'exe') {
          t.createDiv(`${appName}_icon`, "application", '', rectangularBar, `img/${extension}.png`, '', '');
        } else {
          t.createDiv(`${appName}_icon`, "application", '', rectangularBar, `img/${appName.replace(extension, '').toLowerCase()}.png`, '', '');
        }

      } else {
        t.createExplorerSquare(screen, `${menuItem.id}_tab`, `id_${menuItem.id}_icon`, `id_${menuItem.id}_border_inner_contener`, `id_${menuItem.id}_inner_contener`, '', width, height, 'file explorer');
        t.createDiv(`id_${menuItem.id}_icon`, "application", '', rectangularBar, 'img/directory.png', '', '');
      }
      t.addRecentFiles(menuItem);
    }
  };

  // Fonction pour gérer le double tap
  if (isMobile) {
    // Sur mobile, détecte un double tap avec un délai
    document.addEventListener('touchstart', function (e) {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - lastClickTime;

      if (timeDiff < 300 && timeDiff > 0) {  // Si l'écart entre les clics est inférieur à 300ms
        e.preventDefault(); // Empêche le comportement par défaut (zoom, etc.)
        handleClick(e); // Appelle la logique du double tap
      }

      lastClickTime = currentTime;
    }, { passive: false });
  } else {
    // Sur desktop, utilise dblclick
    document.addEventListener('dblclick', handleClick);
  }
}







