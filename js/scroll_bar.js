export function updateThumb() {
     
    
    document.addEventListener('pointerdown', function (e) {
        let item = e.target.closest('.scroll_thumb');
        if (!item) return; // Ignorer si ce n'est pas un .scroll_thumb
    
        // Trouver le conteneur parent de scroll_thumb
        let container = item.closest('.scroll_bar'); 
        if (!container) return;
    
        // Trouver innercontainer (au même niveau que container)
        let innercontainer = container.parentElement.querySelector('.inner_contener');
        if (!innercontainer) return;

        let text = innercontainer.querySelector('.truc');
        if (!text) return;

        let scrollBarRect = container.getBoundingClientRect();
        let itemRect = item.getBoundingClientRect();
        const shiftY = e.clientY - itemRect.top;
    
        let isMoved = false;
 
        function moveAt(pageY) {
            
            let newTop = pageY - shiftY - scrollBarRect.top;
            newTop = Math.max(newTop, 0); // Limiter le déplacement en haut
            newTop = Math.min(newTop, scrollBarRect.height - item.offsetHeight); // Limiter en bas
            item.style.top = `${newTop}px`;

            const thumbPercentage = newTop / (scrollBarRect.height - item.offsetHeight);

            const scrollHeight = text.scrollHeight - innercontainer.clientHeight;
            let newTopTruc = thumbPercentage * scrollHeight;
           
            text.style.top = `-${newTopTruc}px`;
    
            isMoved = true;
        }
    
        function onPointerMove(event) {
            moveAt(event.pageY);
        }
    
        // Ajouter un listener pour déplacer l'élément
        document.addEventListener('pointermove', onPointerMove);
    
        // Lorsque le clic est relâché
        document.addEventListener('pointerup', function () {
            document.removeEventListener('pointermove', onPointerMove);
    
            if (!isMoved) return;
    
            // S'assurer que la position est bien appliquée
            const computedStyle = getComputedStyle(item);
            const currentTop = parseFloat(computedStyle.top) || 0;
            item.style.top = `${currentTop}px`;
        }, { once: true });
    
        // Empêcher le comportement de drag par défaut
        item.ondragstart = () => false;
    });
    
}

export function waitForElement(selector, callback) {
    const interval = setInterval(function () {
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(interval); // Arrêter de vérifier une fois que l'élément est trouvé
            callback(element); // Appeler la fonction de rappel avec l'élément
        }
    }, 100); // Vérifier toutes les 100ms
}




export function update_size_thumbs(){
    waitForElement('.truc', function () {
        let thumbs = document.querySelectorAll('.scroll_thumb');
        let scroll_bars = document.querySelectorAll('.scroll_bar');
        let inner_containers = document.querySelectorAll('.inner_contener');
        let texts = document.querySelectorAll('.truc');


        function updateThumbHeight(thumb, scroll_bar, inner_container, text) {
            let height_text = text.offsetHeight; // Hauteur réelle de .truc
            const height_scroll_bar = scroll_bar.offsetHeight; // Hauteur réelle de la barre de défilement
            const height_inner_container = inner_container.offsetHeight; // Hauteur réelle du conteneur interne
            if( height_text === 0) height_text = height_inner_container;
            // Calcul de la nouvelle hauteur du thumb
            const new_height = (height_scroll_bar * height_inner_container) / height_text;

            // Appliquer la nouvelle hauteur au thumb
            thumb.style.height = `${new_height}px`;

            const thumbHeight = parseFloat(thumb.style.height); // Convertir la hauteur du thumb en nombre
            if (thumbHeight > height_scroll_bar && parseFloat(text.style.top || "0") !== 0) {
                // Réinitialiser les positions si nécessaire
                text.style.top = `0px`;
                thumb.style.top = `0px`;
            }

            
        }

        thumbs.forEach((thumb, index) => {
            const scroll_bar = scroll_bars[index];
            const inner_container = inner_containers[index];
            const text = texts[index];

            if (scroll_bar && inner_container && text) {
                // Mettre à jour la hauteur pour ce groupe
                updateThumbHeight(thumb, scroll_bar, inner_container, text);

                // Ajouter un ResizeObserver pour surveiller les changements de dimensions
                const observer = new ResizeObserver(() => {
                    updateThumbHeight(thumb, scroll_bar, inner_container, text);
                });

                // Observer les éléments dont les dimensions peuvent changer
                observer.observe(scroll_bar);
                observer.observe(inner_container);
                observer.observe(text);
            }
        });

    });
}