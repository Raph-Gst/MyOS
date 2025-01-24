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

      } else if (app === 'application3') {
        appDiv =  t.createDiv("application3", "application", " ", rectangularBar, 'img/main_style.gif', null, null);
        if (appDiv) {
          t.createSquare(screen, 'application3_tab', 'application3', 'inner-application3', 'inner-content3',null,  width, height, 'Application3');
        }
        t.html_injector('html/github.html', 'inner-content3');
        d.update_size_thumbs();

      } else if (app === 'application4') {
        appDiv =  t.createDiv("application4", "application", " ", rectangularBar, 'img/main_style.gif', null, null);
        if (appDiv) {
          t.createSquare(screen, 'application4_tab', 'application4', 'inner-application4', 'inner-content4',null,  width, height, 'Application4');
        }
        t.html_injector('html/github.html', 'inner-content4');
        d.update_size_thumbs();

      } else if (app === 'application5') {
        appDiv =  t.createDiv("application5", "application", " ", rectangularBar, 'img/main_style.gif');
        if (appDiv) {
          t.createSquare(screen, 'application5_tab', 'application5', 'inner-application5', 'inner-content5',null,  width, height, 'Application5');
        }
        t.html_injector('html/github.html', 'inner-content5');
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

  
  const folderExplorer = document.getElementById('application6');
  let application6;  // Variable pour vérifier si l'application est ouverte
  
  if (folderExplorer) {
    folderExplorer.addEventListener('dblclick', (e) => {
      const app = folderExplorer.dataset.application;
      console.log(`Application sélectionnée : ${app}`);
  

  
      // Si c'est l'application6
      if (app === 'application6') {
        // Créer la div de l'application
        t.createSquare(screen, 'application6_tab', 'application6', 'inner-application6', null, null, width, height,'Explorateur de fichier');
  
        // Assigner l'élément de l'application à la variable
        application6 = document.getElementById('inner-application6');
  
        // Créer les deux divs à l'intérieur de l'application
        t.createTwoDivs(application6, 'folder', 'folder_main', 20, 'inner_folder', 'inner_folder', 70);
  
        // Ajouter un bouton de fermeture à l'application

      }
    });
  } else {
    console.error("L'élément avec l'ID 'folder-explorer' est introuvable dans le DOM.");
  }
}


