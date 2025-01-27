import * as t  from './tab.js';

export function update_file_explorer() {
    const folder_shortcut = document.querySelectorAll('.folder_shortcut');
    const rectangularBar = document.querySelector('.rectangular-bar');
    const screen = document.querySelector('.screen');
    const shortcut = document.querySelectorAll('.shortcut');

    const height = '30vh';
    const width = '30vw';
    const data_div = 'shortcut';
    const data_div2 = 'folder';

    t.IndexClickApplication(shortcut);
    folder_shortcut.forEach((link) => {
        link.addEventListener('dblclick', function () {
            const short = link.dataset.application;
            console.log(`Application sélectionnée : ${short}`);

            let shortcutDiv;

            if (short === `${data_div}1`) {
                handleShortcut(`${data_div}1`, data_div, data_div2, rectangularBar, screen, width, height, 'html/fileManagerStructure/Documents.html');
              } else if (short === `${data_div}2`) {
                handleShortcut(`${data_div}2`, data_div, data_div2, rectangularBar, screen, width, height, 'html/fileManagerStructure/Programmes.html');
              } else if (short === `${data_div}3`) {
                handleShortcut(`${data_div}3`, data_div, data_div2, rectangularBar, screen, width, height, 'html/fileManagerStructure/Vidéos.html');
              }
             else {
                console.log('Autre application sélectionnée');
            }

            if (shortcutDiv) {
                console.log(`Application ${short} créée avec succès.`);
            } else {
                console.warn(`Application ${short} existe déjà ou un problème est survenu.`);
            }
        });
    });

    const folderExplorer = document.getElementById('application6');
    if (folderExplorer) {
        folderExplorer.addEventListener('dblclick', (e) => {
            const app = folderExplorer.dataset.application;
            console.log(`Application sélectionnée : ${app}`);
            if (app === 'application6') {
                t.createSquare(screen, 'application6_tab', 'application6', 'inner-application6', null, null, width, height,'Explorateur de fichier');
                t.html_injector('html/folder_list.html', 'inner-application6');
            }
        });
    } else {
        console.error("L'élément avec l'ID 'folder-explorer' est introuvable dans le DOM.");
    }
}
export function handleShortcut(short, dataDiv, dataDiv2, rectangularBar, screen, width, height, path) {
    const shortcutDiv = t.createDiv(short, dataDiv, " ", rectangularBar, 'img/directory.png', null, null);
    if (shortcutDiv) {
      t.createSquare(screen, `${short}_tab`, short, `${dataDiv2}${short.charAt(short.length - 1)}`, null, null, width, height, 'Explorateur de fichier');
  
      // Chaîne les injections de HTML
      t.html_injector('html/folder_list.html', `${dataDiv2}${short.charAt(short.length - 1)}`, 'inner_folders', `inner_folder${short.charAt(short.length - 1)}`)
        .then(() => {
          // Attendre que 'folder_list.html' soit injecté avant d'injecter 'Documents.html'
          return t.html_injector(path, `inner_folder${short.charAt(short.length - 1)}`);
        })
        .then(() => {
          console.log(`Tous les contenus HTML pour ${short} ont été injectés avec succès.`);
        })
        .catch((error) => {
          console.error(`Erreur lors de l’injection des contenus HTML pour ${short} :`, error);
        });
    }
  }