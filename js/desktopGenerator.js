

export async function generateDesktopMenu() {
    try {
        const response = await fetch('http://localhost:3000/files'); // Appel de l'API
        const items = await response.json(); // Récupération des données JSON
        const screenDiv = document.querySelector('.screen'); 


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
        setInterval(updateDateTime, 1000);


        updateDateTime();



 

    } catch (err) {
        console.error('Erreur lors de la génération du menu de bureau :', err);
    }
}

function updateDateTime() {
    const now = new Date();
  
    // Formater l'heure
    const formattedTime = now.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  
    // Formater la date
    const formattedDate = now.toLocaleDateString('fr-FR', { 

      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });

    document.getElementById("datetime").innerHTML = `${formattedTime}<br>${formattedDate}`;
  }


