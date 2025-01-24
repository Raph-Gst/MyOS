let lastPosition = { x: 30, y: 30 };

export function createSquare(parentElement, id, id2, id3, id4, backgroundImagePath, width, height, text) {
  const screenClass = document.querySelector('.screen');
  const screen = screenClass.getBoundingClientRect();
  const newSquare = createDiv(id, 'new-square', '', parentElement, backgroundImagePath, width, height);
  
  let fullscreen = false;
  let minus = false;

  newSquare.style.position = 'absolute';
  newSquare.style.left = `${lastPosition.x + 3}vw`; 
  newSquare.style.top = `${lastPosition.y + 3}vh`; 

  lastPosition.x += 3; 
  lastPosition.y += 3; 

  if (lastPosition.x > 80) lastPosition.x = 0; 
  if (lastPosition.y > 80) lastPosition.y = 0;

  const border_inner_contener = createDiv(id3, 'border-inner-contener', '', newSquare, backgroundImagePath, null, null);
  const inner_contener = createDiv(id4, 'inner_contener', '', border_inner_contener, backgroundImagePath);
  const scroll_bar = createDiv(null, 'scroll_bar', '', border_inner_contener, backgroundImagePath);
  const scroll_thumb = createDiv(null, 'scroll_thumb', '', scroll_bar, backgroundImagePath);

  const top_tab = createDiv(null, 'top_tab', '', newSquare, backgroundImagePath);
  

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




 export function createTwoDivs(parentElement, class1, id1, width1, class2, id2, width2) {
    // Vérifier si le parent existe
    if (!parentElement) {
      console.error("Le parent spécifié n'existe pas dans le DOM.");
      return;
    }
  
    // Créer le premier div
    const div1 = document.createElement('div');
    div1.className = class1;
    div1.id = id1;
    div1.style.width = `${width1}%`;

    div1.style.display = 'inline-block';
    parentElement.appendChild(div1);
  
    // Créer le second div
    const div2 = document.createElement('div');
    div2.className = class2;
    div2.id = id2;
    div2.style.width = `${width2}%`;

    div2.style.display = 'inline-block';
    parentElement.appendChild(div2);
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

export function enableDrag2(classname) {
  document.addEventListener('pointerdown', function (e) {
      const item = e.target.closest(`.${classname}`);

      // Ignorer si l'élément cliqué n'a pas la classe spécifiée
      if (!item) return;
      
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

export function IndexClickApplication(div) {
  

  div.forEach((link) => {
    console.log('Ajout d\'un événement "click" pour l\'application :', link.id);

    link.addEventListener('click', function () {
      const appId = link.id; // Récupère l'ID de l'élément cliqué
      console.log(`ID de l'application cliquée : ${appId}`);

      if(appId === 'folder-explorer') return;

      const tabId = `${appId}_tab`; // Génère l'ID associé (par exemple, 'application1_tab')
      console.log(`ID de la tab associée : ${tabId}`);

      // Réinitialiser tous les z-index avant de mettre à jour
      const allTabs = document.querySelectorAll('[id$="_tab"]'); // Tous les éléments dont l'ID se termine par '_tab'
      console.log('Toutes les tabs trouvées pour réinitialisation :', allTabs);

      allTabs.forEach((tab) => {
        console.log(`Réinitialisation du z-index de : ${tab.id}`);
        tab.style.zIndex = 1; // Réinitialisation à 1
      });

      // Appliquer le z-index élevé à l'élément tab correspondant
      const selectedTab = document.getElementById(tabId);
      if (selectedTab) {
        console.log(`Tab trouvée pour mise à jour du z-index : ${selectedTab.id}`);
        selectedTab.style.zIndex = 10; // Z-index élevé pour la tab sélectionnée
      } else {
        console.warn(`Aucun élément trouvé avec l'ID "${tabId}"`);
      }
    });
  });
}

export function html_injector(path, id) {
  // Récupérer l'élément cible à partir de son ID
  const element = document.getElementById(id);

  // Vérifier si l'élément existe
  if (!element) {
    console.error(`L'élément avec l'ID "${id}" est introuvable.`);
    return;
  }

  // Charger le contenu du fichier HTML
  fetch(path)
  .then((response) => {
    console.log(response); // Vérifiez la réponse
    if (!response.ok) {
      throw new Error(`Erreur lors du chargement du fichier HTML : ${response.statusText}`);
    }
    return response.text(); // Récupérer le texte du fichier HTML
  })
  .then((html) => {
    if (html) {
      // Injecter le contenu HTML dans l'élément cible
      element.innerHTML = html;
      console.log("Contenu HTML injecté avec succès.");
    } else {
      console.error("Le contenu HTML récupéré est vide.");
    }
  })
  .catch((error) => {
    console.error("Erreur lors de l'injection du contenu HTML :", error);
  });

}
