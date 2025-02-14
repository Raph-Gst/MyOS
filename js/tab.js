import { update_file_explorer , openFolders, openShortcut} from './file_explorer.js';

let lastPosition = { x: 30, y: 30 };

export function createSquare(parentElement, id, id2, id3, id4, backgroundImagePath, width, height, text) {
  
  const newSquare = createDiv(id, 'new-square', '', parentElement, backgroundImagePath, width, height);

  if(!newSquare) return;


  let fullscreen = false;
  let minus = false;

  newSquare.style.position = 'absolute';
  newSquare.style.left = `${lastPosition.x + 3}vw`; 
  newSquare.style.top = `${lastPosition.y + 3}vh`; 

  lastPosition.x += 3; 
  lastPosition.y += 3; 

  if (lastPosition.x > 80) lastPosition.x = 0; 
  if (lastPosition.y > 80) lastPosition.y = 0;
  const top_tab = createDiv(null, 'top_tab', '', newSquare, backgroundImagePath);

  const border_inner_contener = createDiv(id3, 'border-inner-contener', '', newSquare, backgroundImagePath, null, null);
  if(id != 'application6_tab') createDiv(id4, 'inner_contener', '', border_inner_contener, backgroundImagePath);
  //const scroll_bar = createDiv(null, 'scroll_bar', '', border_inner_contener, backgroundImagePath);
  //const scroll_thumb = createDiv(null, 'scroll_thumb', '', scroll_bar, backgroundImagePath);

  
  

  const closeButton = createDiv(null, 'close-btn', '', top_tab, null, null, null);
  const fullScreenButton = createDiv(null, 'full_screen_btn', '', top_tab, null, null, null);
  const minusButton = createDiv(null, 'minus_button', '', top_tab, null, null, null);
  createDiv(null, 'application_name', text, top_tab, null, null, null);

  closeButton.addEventListener('click', function () {
    removeDiv(id);
    if(id2 != 'application6') removeDiv(id2);
    lastPosition = { x: 30, y: 30 }
  });

  fullScreenButton.addEventListener('click', function () {
    if (!fullscreen) {
      newSquare.style.width = '98.5%';
      newSquare.style.height = '91%';
      newSquare.style.top = '1%';
      newSquare.style.left = '0.5%';
      newSquare.style.position = 'absolute'; 
      fullscreen = true;
    } else {
      newSquare.style.width = '30vw';
      newSquare.style.height = '30vh';
      newSquare.style.top = `${lastPosition.y + 3}vh`;
      newSquare.style.left =`${lastPosition.x + 3}vw`;
      newSquare.style.position = 'absolute'; 
      fullscreen = false;
    }
  });



  minusButton.addEventListener('click', function () {
    if (!minus) {
        // Récupérer l'élément avec id2 (target)
        const targetElement = document.getElementById(id2);

        // Si l'élément existe, récupérer ses dimensions et position
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect(); // Position absolue et dimensions
            const parentRect = targetElement.parentElement.getBoundingClientRect(); // Position de la div parente

            // Calculer la position relative à la div parente
            const relativeTop = rect.top - parentRect.top;
            const relativeLeft = rect.left - parentRect.left;

            // Appliquer ces styles à newSquare en utilisant des unités vh et vw
            newSquare.style.width = `${(rect.width / window.innerWidth) * 100}vw`;
            newSquare.style.height = `${(rect.height / window.innerHeight) * 100}vh`;
            newSquare.style.top = `${80}vh`;
            newSquare.style.left = `${(relativeLeft / window.innerWidth) * 100}vw`;
            newSquare.style.zIndex = '0';
        }
      else {
        // Réinitialiser à la taille par défaut lorsque le bouton est cliqué à nouveau
        newSquare.style.width = '30vw';
        newSquare.style.height = '30vh';
        newSquare.style.top = `${lastPosition.y }vh`;
        newSquare.style.left =`${lastPosition.x }vw`;
        newSquare.style.position = 'absolute'; 
        newSquare.style.zIndex = '1';
        minus = false;
      }

        minus = true;
    }   
    const targetElement = document.getElementById(id2);
      targetElement.addEventListener('click', function() {
        // Réinitialiser newSquare à sa taille d'origine
        newSquare.style.width = '30vw';
        newSquare.style.height = '30vh';
        newSquare.style.top = `${lastPosition.y }vh`;
        newSquare.style.left =`${lastPosition.x }vw`;
        newSquare.style.position = 'absolute';
        newSquare.style.zIndex = '1';
    
        // Réinitialiser minus à false
        minus = false;
      });
    
});

  

  IndexUpdate();
}


  
  export function createDiv(id, className, textContent, parentElement, backgroundImagePath, width, height) {
    const newDiv = document.createElement('div');
  
    if (id) {
      newDiv.id = id;
    }
  
    if (className) {
      newDiv.className = className;
    }
  
    if (textContent) {
      newDiv.textContent = textContent;
    }
  
    if (backgroundImagePath) {
      newDiv.style.backgroundImage = `url(${backgroundImagePath})`;
      newDiv.style.backgroundSize = 'cover';
      newDiv.style.backgroundPosition = 'center';
      newDiv.style.backgroundRepeat = 'no-repeat';
    }

    if (width && height) {
      newDiv.style.height = height;
      newDiv.style.width = width;
    }

  
    if (parentElement) {
      const existingApp = parentElement.querySelector('#' + id);
      console.log("le truc est " + existingApp);
      if (existingApp) {
        console.log('Une application avec cet ID est déjà ouverte.');
        return;
      } else {
        parentElement.appendChild(newDiv);
      }
    } else {
      document.body.appendChild(newDiv);
    }
  
    return newDiv;
  }
  
  function removeDiv(id) {
    const divToRemove = document.getElementById(id);
    if (divToRemove) {
        divToRemove.remove(); 
        console.log(`La div avec l'ID "${id}" a été supprimée.`);
    } else {
        console.log(`Aucune div trouvée avec l'ID "${id}".`);
    }
}

let explorerCount = 0; // Compteur global pour générer des IDs uniques

export function createExplorerSquare(parentElement, id, id2, id3, id4, backgroundImagePath, width, height, text) {
  explorerCount++; // Incrémenter pour obtenir un identifiant unique
  const uniqueId = `file_explorer_${id}`;

  // Appeler createSquare pour créer la base du "tab"
  const newSquare = createSquare(parentElement, uniqueId, id2, id3, id4, backgroundImagePath, width, height, text);

  // Sélectionner le conteneur principal où ajouter le contenu
  const borderInnerContainer = document.getElementById(id3); // Correspond à `border-inner-contener`
  
  if (borderInnerContainer) {
    borderInnerContainer.innerHTML = `
      <div class="header" id="header_${id}">
        <div class="row_explorer" id="row_explorer_${id}">
          <div id="return_explorer_${id}" class="nav_button"><</div>
          <div class="search_bar" id="search_bar_${id}">
            <div class="search_bar_text" id="search_bar_text_${id}"></div>
          </div>
        </div>
      </div>

      <div class="content" id="content_${id}">
        <div class="list_folder" id="list_folder_${id}">
          <div class="list_folder_contener" id="list_folder_contener_${id}"></div>
        </div>
        <div class="inner_folders" id="inner_folders_${id}"></div>
      </div>

      <div class="footer_file_explorer" id="footer_file_explorer_${id}">
        <div class="folder_name" id="folder_name_${id}">
          <div class="folder_name_text" id="folder_name_text_${id}"></div>
        </div>
      </div>
    `;
  }
  update_file_explorer(id).then(() => {
  openFolders(id);
  OpenApplication(id);
  openShortcut(id.replace('_tab', ''), id);
  });
  
  return newSquare;
}


export function enableDrag2(classname) {
  document.addEventListener('pointerdown', function (e) {
      let item = e.target.closest(`.${classname}`);

      // Ignorer si l'élément cliqué n'a pas la classe spécifiée
      if (!item) return;

      item = item.parentElement;
      
      // Ignorer si l'élément cliqué est un descendant de la classe "scroll-bar"
      if (e.target.closest('.scroll_bar')) return;

      const shiftX = e.clientX - item.getBoundingClientRect().left;
      const shiftY = e.clientY - item.getBoundingClientRect().top;

      // Initialisation de la position si elle n'est pas définie
      if (!item.style.left) item.style.left = '0px';
      if (!item.style.top) item.style.top = '0px';

      let isMoved = false; // Variable pour détecter si l'élément a été déplacé

      function moveAt(pageX, pageY) {
        // Calcul des nouvelles positions en pixels
        const newLeft = pageX - shiftX;
        const newTop = pageY - shiftY;

        // Conversion des pixels en unités relatives (vw et vh)
        const newLeftVW = (newLeft / window.innerWidth) * 100;
        const newTopVH = (newTop / window.innerHeight) * 100;

        // Appliquer les nouvelles positions
        item.style.left = `${newLeftVW - 10}vw`;
        item.style.top = `${newTopVH - 10}vh`;

        isMoved = true;
    }

      // Déplacer l'élément au fur et à mesure
      function onPointerMove(event) {
          moveAt(event.pageX, event.pageY);
      }

     item.addEventListener('pointerleave', function () {
        document.removeEventListener('pointermove', onPointerMove);
    });

      document.addEventListener('pointermove', onPointerMove);

      item.addEventListener(
        'pointerup',
        function () {
            document.removeEventListener('pointermove', onPointerMove);
    
            if (!isMoved) return;
    
            // Initialisation des styles si nécessaire
            if (!item.style.left) item.style.left = '0vw';
            if (!item.style.top) item.style.top = '0vh';
    
            // Analyse des valeurs actuelles
            let left = parseFloat(item.style.left) || 0; // Valeur par défaut à 0
            let top = parseFloat(item.style.top) || 0; // Valeur par défaut à 0
    
            // Appliquer la position ajustée
            item.style.left = `${left}vw`;
            item.style.top = `${top}vh`;
        },
        { once: true }
    );

      // Empêche le comportement par défaut
      item.ondragstart = () => false;
  });
}

export function IndexUpdate(){
  const divs = document.querySelectorAll('.new-square');

  divs.forEach(div => {

      div.style.zIndex = 1;

      div.addEventListener('click', () => {
          divs.forEach(d => d.style.zIndex = 1);
          div.style.zIndex = 10;
      });
 
 
    });
}

export function IndexClickApplication(classname) {
  

  document.addEventListener('click', function (e) {
      if (e.target.classList.contains(classname)) {
        let appID = e.target.id.replace(/_icon$/, '');
        appID = appID.replace(/id_$/, '');
          const appID_tab = document.getElementById(`${appID}_tab`);

          if (appID_tab) {
              const allTabs = document.querySelectorAll('.new-square'); // Récupère toutes les divs avec la classe

              // Réinitialise le z-index de toutes les divs
              allTabs.forEach(tab => tab.style.zIndex = 1);

              // Met le z-index de la div sélectionnée à 10
              appID_tab.style.zIndex = 10;
          }
      }
  });
}


import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.0.1/dist/purify.es.min.js';

export function html_injector(path, id, className, newId) {
  return new Promise((resolve, reject) => {
    const element = document.getElementById(id);

    if (!element) {
      reject(new Error(`L'élément avec l'ID "${id}" est introuvable.`));
      return;
    }

    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur lors du chargement du fichier HTML : ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        if (html) {
          element.innerHTML = html;

          change_id(element, className, newId);

          console.log(`Contenu HTML injecté dans l'élément avec l'ID "${id}".`);
          resolve(); // Résolution de la promesse
        } else {
          throw new Error("Le contenu HTML récupéré est vide.");
        }
      })
      .catch((error) => {
        console.error(`Erreur lors de l'injection du contenu HTML : ${error.message}`);
        reject(error); // Rejet de la promesse
      });
  });
}



export function change_id(parentElement, className, newId ) {
  if (parentElement && className && newId) {
    const targetElement = parentElement.querySelector(`.${className}`);
    if (targetElement) {
      targetElement.id = newId;
    }
  }
}



export function OpenApplication(id) {
  const innerFoldersContainer = document.getElementById(`inner_folders_${id}`);
  const width = '20vw';
  const height = '20vh';
  const screen = document.querySelector('.screen');
  const rectangularBar = document.querySelector('.rectangular-bar');
  
  innerFoldersContainer.addEventListener('dblclick', function(e) {
      if (e.target.id.includes('.')) {
          const app = e.target.id;
          const extension = app.split('.').pop(); // Récupère l'extension du fichier
          const appName = app.replace(`.${extension}`, ''); // Supprime l'extension du nom du fichier
          console.log(app + ' ' + ' ' + extension + ' ' + appName)

          // Création du tab pour l'application
          createSquare(
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

          // Ajout de l'icône de l'application avec l'image correspondant à l'extension
          createDiv(
              `${appName}_icon`, 
              "application", 
              '', 
              rectangularBar, 
              `img/${extension}.png`, // Utilisation de l'extension pour l'image
              '', 
              ''
          );
      }
  });
}
