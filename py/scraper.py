import requests
from bs4 import BeautifulSoup

# Récupérer la page GitHub
url = "https://github.com/zbeubizbeub"
response = requests.get(url)

# Vérifier si la page a été récupérée avec succès
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')

    # Exemple : Extraire les liens des projets sur le profil GitHub
    repo_links = soup.find_all('a', {'itemprop': 'name codeRepository'})

    # Préparer une liste HTML des projets
    ul_content = '<ul>'
    for link in repo_links:
        repo_url = "https://github.com" + link.get('href')
        repo_name = link.get_text(strip=True)
        ul_content += f'<li><a href="{repo_url}" target="_blank">{repo_name}</a></li>'
    ul_content += '</ul>'

    # Afficher le contenu HTML
    print(ul_content)
else:
    print(f"Erreur lors du téléchargement de la page : {response.status_code}")
