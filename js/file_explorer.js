import { fetchData } from './api.js';


export async function update_file_explorer(id) {
    try {
        const { folders, files } = await fetchData();
        const list_folder = document.getElementById(`list_folder_contener_${id}`);
        
        if (!list_folder) {
            console.error(`L'élément avec l'ID list_folder_contener_${id} n'a pas été trouvé.`);
            return;
        }

        const foldersWithParentId3 = folders.filter(folder => folder.parent_id === 3);
        const foldersWithNullParentId = folders.filter(folder => folder.parent_id === null);

        foldersWithParentId3.forEach(folder => list_folder.appendChild(createItemElement('folder', folder.name)));
        list_folder.appendChild(document.createElement('div')).className = 'space';
        foldersWithNullParentId.forEach(folder => list_folder.appendChild(createItemElement('folder', folder.name)));

    } catch (err) {
        console.error('Erreur lors de la mise à jour de l’explorateur de fichiers:', err);
    }
}

export async function openFolders(id) {
    console.log(id);
    const tab = document.getElementById(`file_explorer_${id}`);
    const innerFoldersContainer = document.getElementById(`inner_folders_${id}`);
    
    if (!innerFoldersContainer) {
        console.error(`L'élément avec l'ID inner_folders_${id} n'a pas été trouvé.`);
        return;
    }

    tab.addEventListener('click', async (e) => {
        if (e.target.className === 'folder' && !e.target.id.includes('.')) {
            const folderId = e.target.id;
            console.log(`Dossier cliqué : ${folderId}`);

            try {
                innerFoldersContainer.innerHTML = '';
                const { folders, files } = await fetchData();

                const folder = folders.find(f => f.name === folderId);
                if (!folder) {
                    console.error(`Aucun dossier trouvé avec le nom : ${folderId}`);
                    return;
                }
                updateBar(id, folder, folders);
                returnButton(id, folder, folders, files)
                const childFolders = folders.filter(f => f.parent_id === folder.id);
                const childFiles = files.filter(f => f.folder_id === folder.id);

                childFolders.forEach(folder => innerFoldersContainer.appendChild(createItemElement('folder', folder.name)));
                childFiles.forEach(file => innerFoldersContainer.appendChild(createItemElement('file', file.name, file.extension)));

                

            } catch (err) {
                console.error('Erreur lors de la récupération des fichiers :', err);
            }
        }
    });
}

export async function openShortcut(id, id2) {
    try {
        const innerFoldersContainer = document.getElementById(`inner_folders_${id2}`);
        if (!innerFoldersContainer) {
            console.error(`L'élément avec l'ID inner_folders_${id2} n'a pas été trouvé.`);
            return;
        }

        const { folders, files } = await fetchData();

        const foundFolder = folders.find(folder => folder.name === id);
        if (!foundFolder) {
            console.log('Dossier non trouvé pour l\'id donné:', id);
            return;
        }
        updateBar(id2, foundFolder, folders);
        returnButton(id2, foundFolder, folders, files)

        const childFolders = folders.filter(folder => folder.parent_id === foundFolder.id);
        const childFiles = files.filter(file => file.folder_id === foundFolder.id);

        childFolders.forEach(folder => innerFoldersContainer.appendChild(createItemElement('folder', folder.name)));
        childFiles.forEach(file => innerFoldersContainer.appendChild(createItemElement('file', file.name, file.extension)));

    } catch (err) {
        console.error('Erreur lors de la récupération des fichiers :', err);
    }
}

export async function updateBar(id, folder, folders) {
  try {
      const folder_name_text = document.getElementById(`folder_name_text_${id}`);
      const search_bar_text = document.getElementById(`search_bar_text_${id}`);

      folder_name_text.textContent = folder.name;
      search_bar_text.textContent = createPath(folder, folders);



  } catch (err) {
      console.error('Erreur lors de la récupération des fichiers :', err);
  }
}

export function createPath(folder, folders) {
  let path = folder.name;
  let currentFolder = folder;

  while (currentFolder.parent_id !== null) {
      currentFolder = folders.find(f => f.id === currentFolder.parent_id);
      if (!currentFolder) break; // Sécurité si l'ID parent n'existe pas
      path = `${currentFolder.name}/${path}`;
  }

  return path;
}

export function returnButton(id, folder, folders, files) {
  const returnButton = document.getElementById(`return_explorer_${id}`);

  if (!returnButton) {
      console.error(`L'élément avec l'ID return_explorer_${id} n'a pas été trouvé.`);
      return;
  }

  returnButton.addEventListener('click', async () => {
      if (folder.parent_id !== null) {
          // Trouver le dossier parent
          const parentFolder = folders.find(f => f.id === folder.parent_id);
          if (parentFolder) {
              // Mettre à jour la barre avec le dossier parent
              updateBar(id, parentFolder, folders);

              // Vider le contenu des dossiers intérieurs
              const innerFoldersContainer = document.getElementById(`inner_folders_${id}`);
              innerFoldersContainer.innerHTML = '';

              // Charger les sous-dossiers et fichiers du dossier parent
              const childFolders = folders.filter(f => f.parent_id === parentFolder.id);
              const childFiles = files.filter(f => f.folder_id === parentFolder.id);

              // Ajouter les dossiers enfants et fichiers au conteneur
              childFolders.forEach(folder => innerFoldersContainer.appendChild(createItemElement('folder', folder.name)));
              childFiles.forEach(file => innerFoldersContainer.appendChild(createItemElement('file', file.name, file.extension)));
          }
      }
  });
}


export function createItemElement(type, name, extension = '') {
  const element = document.createElement('div');
  element.className = 'folder';
  element.id = name;

  const img = document.createElement('img');
  img.src = type === 'folder' ? 'img/directory.png' : `img/${extension}.png`;

  const anchor = document.createElement('p');
  anchor.textContent = name;

  element.appendChild(img);
  element.appendChild(anchor);

  return element;
}
