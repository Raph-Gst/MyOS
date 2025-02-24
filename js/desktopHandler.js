import * as t  from './tab.js';


export async function generateDesktopMenu() {
    try {
        const response = await fetch('http://localhost:3000/files'); // Appel de l'API
        const items = await response.json(); // Récupération des données JSON
        const screenDiv = document.querySelector('.screen'); 

        if(!screenDiv) return;

        items.forEach(item => {
            // Création de l'élément du menu
            const menuItem = document.createElement('div');
            menuItem.className = 'menu_item';
            menuItem.id = item.name; 

            // Création de l'image
            const img = document.createElement('img');

            // Vérification du type : fichier ou dossier
            if (item.extension === 'shortcut') {
                img.src = 'img/directory.png'; // Icône de dossier
            } else {
                img.src = `img/${item.extension}.png`; // Icône spécifique au fichier
            }

            // Création de l'ancre
            const anchor = document.createElement('a');
            anchor.className = 'menu_link';
            anchor.textContent = item.name; 

            // Ajout de l'image et du lien dans l'élément du menu
            menuItem.appendChild(img);
            menuItem.appendChild(anchor);

            // Ajout de l'élément dans le menu de bureau
            screenDiv.appendChild(menuItem);
        });
        console.log("le bureau s'est généré correctement");
        setInterval(updateDateTime, 1000);


        updateDateTime();

        toggleDropdownMenu('start-menu', 'dropdown-menu');

        openFileExplorer(screenDiv, 'id_Home_icon');

        const eye = document.getElementById('eye');
        const content = document.getElementById('content_eye_widget');
        const radius = 1; // en vw

        makeEyeFollowMouse(eye, content, radius);

        shutdownHandler();
 

    } catch (err) {
        console.log('Erreur lors de la génération du menu de bureau :', err);
    }
}

export function updateDateTime() {

    const datetime = document.getElementById("datetime");
    if(!datetime) return;

    const now = new Date();
  
    // Formater l'heure
    const formattedTime = now.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  
    const formattedDate = now.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
    
    const parts = formattedDate.split(' '); 
    const shortMonth = parts[1].substring(0, 4); 
    const finalDate = `${parts[0]} ${shortMonth} ${parts[2]}`;


    datetime.innerHTML = `${finalDate} ${formattedTime}`;
  }

  
  function toggleDropdownMenu(buttonId, menuId) {
    const button = document.getElementById(buttonId);
    const menu = document.getElementById(menuId);

    if (!button || !menu) {
        console.error("Bouton ou menu introuvable.");
        return;
    }

    button.addEventListener('click', function(event) {
        menu.classList.toggle('show');
        event.stopPropagation(); // Empêche la fermeture immédiate
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.classList.remove('show');
        }
    });
}

function openFileExplorer(screen, id) {
    document.addEventListener('dblclick', function(e) {
        // Vérifier si l'élément cliqué ou son parent a l'ID ciblé
        const targetElement = e.target.closest(`#${id}`);

        if (!targetElement) return; 

        const HomeExplorer = document.getElementById(id); // Corrigé ici
        if (!HomeExplorer) {
            console.error("HomeExplorer est vide");
            return;
        }

        const id_tab = HomeExplorer.id.replace('id_', '').replace('_icon', '');
        console.log(id_tab);

        t.createExplorerSquare(
            screen,
            `${id_tab}_tab`,
            ``,
            `id_${id_tab}_border_inner_contener`,
            `id_${id_tab}_inner_contener`,
            '',
            '30vw',
            '30vh',
            `file explorer`
        );
    });
}


function makeEyeFollowMouse(eyeElement, containerElement, radius) {
    if(!eyeElement || !containerElement || !radius) return;
    document.addEventListener('mousemove', (event) => {
        const rect = containerElement.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const mouseX = event.clientX - rect.left; // Position de la souris par rapport à la div
        const mouseY = event.clientY - rect.top;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Limiter le mouvement à un cercle de rayon spécifié
        let x = 0;
        let y = 0;

        if (distance < radius * (window.innerWidth / 100)) {
            x = deltaX;
            y = deltaY;
        } else {
            const angle = Math.atan2(deltaY, deltaX);
            x = Math.cos(angle) * radius * (window.innerWidth / 100);
            y = Math.sin(angle) * radius * (window.innerWidth / 100);
        }

        eyeElement.style.transform = `translate(${x}px, ${y}px)`;
    });
}


function shutdownHandler(){
    document.getElementById('shutdown').addEventListener('click', function() {

      if (window.location.href.includes('index.php?page=endoflight')) {

          window.location.href = 'index.php';
      } else {

          window.location.href = 'index.php?page=endoflight';
      }
    });
  }