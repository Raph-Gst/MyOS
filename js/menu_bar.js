const swup = window.swup;

import * as t  from './tab.js';
import * as d  from './scroll_bar.js';

export function tab(){



  t.enableDrag2("new-square");
  
  
  const menuLinks = document.querySelectorAll('.menu-link');
  const rectangularBar = document.querySelector('.rectangular-bar');
  const screen = document.querySelector('.screen');
  const application = document.querySelectorAll('.application');

  const height = '30vh';
  const width = '30vw';
  
  d.updateThumb();

  

  // Vérifications initiales
  if (!menuLinks.length || !rectangularBar || !screen) {
    console.warn("Un ou plusieurs éléments nécessaires (menu-links, rectangular-bar, screen) n'existent pas dans le DOM.");
    return;
  }
  t.IndexClickApplication(application);
  menuLinks.forEach((link) => {
    link.addEventListener('dblclick', function () {
      const app = link.dataset.application;
      console.log(`Application sélectionnée : ${app}`);

      let appDiv;

      if (app === 'application1') {
        appDiv =  t.createDiv("application1", "application", " ", rectangularBar, 'img/github.png', null, null);
        if (appDiv) {
          t.createSquare(screen, 'application1_tab', 'application1', 'inner-application1', 'inner-content1',null,  width, height, 'Github');
          t.html_injector('html/github.html', 'inner-content1');
        }
        d.update_size_thumbs();

      } else if (app === 'application2') {
        appDiv =  t.createDiv("application2", "application", " ", rectangularBar, 'img/linkedin.png', null, null);
        if (appDiv) {
          t.createSquare(screen, 'application2_tab', 'application2', 'inner-application2', 'inner-content2',null,  width, height, 'Linkedin');
        }
        t.html_injector('html/linkedin.html', 'inner-content2');
        d.update_size_thumbs();

      
      }  else {
        console.log('Autre application sélectionnée');
      }

      // Log supplémentaire
      if (appDiv) {
        console.log(`Application ${app} créée avec succès.`);
      } else {
        console.warn(`Application ${app} existe déjà ou un problème est survenu.`);
      }
    });
  });

  
 
}


