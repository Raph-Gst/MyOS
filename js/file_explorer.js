import * as t  from './tab.js';

export function update_file_explorer() {
    const folder_shortcut = document.querySelectorAll('.folder_shortcut');
    const rectangularBar = document.querySelector('.rectangular-bar');
    const screen = document.querySelector('.screen');
    const shortcut = document.querySelectorAll('.shortcut');

    const height = '40vh';
    const width = '40vw';
    const data_div = 'shortcut';
    const data_div2 = 'folder';
    openFolder();

    openShortcut(rectangularBar, screen, width, height);
    t.IndexClickApplication('shortcut');
    
    }


export function handleShortcut(short, dataDiv, dataDiv2, rectangularBar, screen, width, height, path) {
    const shortcutDiv = t.createDiv(short, dataDiv, " ", rectangularBar, 'img/directory.png', null, null);
    if (shortcutDiv) {
      t.createSquare(screen, `${short}_tab`, short, `${dataDiv2}${short.charAt(short.length - 1)}`, null, null, width, height, 'Explorateur de fichier');
  
      // Chaîne les injections de HTML
      t.html_injector('html/file_explorer.html', `${dataDiv2}${short.charAt(short.length - 1)}`, 'inner_folders', `inner_folder${short.charAt(short.length - 1)}`)
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

  export function openFolder() {
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('folder')) {
        const folderID = e.target.id;
        const list_folder = e.target.parentElement;
        if(list_folder.classList.contains("inner_folder")){
          let innercontainer = list_folder.parentElement;
          if (innercontainer.classList.contains("inner_folders")) { 
            const innercontainerID = innercontainer.id; 
            console.log(innercontainerID); 
            t.html_injector(`html/fileManagerStructure/${folderID}.html`, innercontainerID, null);
        } else {
            console.log("Le parent n'a pas la classe 'inner_folders'");
        }
          
        }
        else{
          let innercontainer = list_folder.parentElement.querySelector('.inner_folders');
          const innercontainerID = innercontainer.id;
          t.html_injector(`html/fileManagerStructure/${folderID}.html`, innercontainerID, null);
        }
      }
    });
  }

  export function openShortcut(rectangularBar, screen, width, height) {
    document.addEventListener('click', function (e) {
      let appID = e.target.id;
      
      
      if (e.target.classList.contains('menu_item') && appID.startsWith("shortcut_folder")) {
        if (!appID) {
          console.error('ID de l\'application est invalide');
          return;
        }
        appID = e.target.firstElementChild?.id.replace('_shortcut', '');
        
        
        const dataDiv = "shortcut";
        const dataDiv2 = "folder";
        const short = `${dataDiv}_${appID}`;
        console.log(short);
        appID = appID.replace('_', '//');
        console.log(appID);
        const path = `html/fileManagerStructure/${appID}.html`;
  
        handleShortcut(short, dataDiv, dataDiv2, rectangularBar, screen, width, height, path);
      }
    });
  }