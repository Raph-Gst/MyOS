export async function fetchData() {
    try {
        const [response_folders, response_files] = await Promise.all([
            fetch('http://localhost:3000/folders_all'),
            fetch('http://localhost:3000/files_all')
        ]);

        const [folders, files] = await Promise.all([
            response_folders.json(),
            response_files.json()
        ]);

        return { folders, files };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { folders: [], files: [] };
    }
}