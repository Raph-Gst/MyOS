
export function getRandomPosition(min, max, step, usedPositions) {
    let randomValue;
    do {
        randomValue = Math.round((Math.random() * (max - min) + min) / step) * step;
    } while (usedPositions.includes(randomValue));
    return randomValue;
}

export function positionMenuItems(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth) {
    const menuItems = document.querySelectorAll('.menu_item');
    const usedPositions = [];

    menuItems.forEach(item => {
        let left, top;

        do {
            left = getRandomPosition(minWidth, maxWidth, stepWidth, usedPositions);
            top = getRandomPosition(minHeight,maxHeight, stepHeight, usedPositions);
        } while (usedPositions.some(pos => pos.left === left && pos.top === top));

        usedPositions.push({ left, top });

        item.style.left = `${left}vw`;
        item.style.top = `${top}vh`;
    });
}


export function enableDrag(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth) {
    
        document.addEventListener('pointerdown', function (e) {

            let item = e.target.closest(`.menu_item`);

            // Ignorer si l'élément cliqué n'a pas la classe spécifiée
             if (!item) return;

            
            const rect = item.getBoundingClientRect(); // Récupère la position et les dimensions de l'élément
            const shiftX = e.clientX - rect.left;
            const shiftY = e.clientY - rect.top;

            let isMoved = false;

            // Fonction pour déplacer l'élément
            function moveAt(pageX, pageY) {
                // Calcul des nouvelles positions en pixels
                const newLeft = pageX - shiftX;
                const newTop = pageY - shiftY;

                // Conversion des pixels en unités relatives (vw et vh)
                const newLeftVW = (newLeft / window.innerWidth) * 100;
                const newTopVH = (newTop / window.innerHeight) * 100;

                // Appliquer les nouvelles positions
                item.style.left = `${newLeftVW -7}vw`;
                item.style.top = `${newTopVH - 10}vh`;

                isMoved = true;
            }

            // Fonction pour ajuster la position à la grille
            function snapToGrid(value, gridSize) {
                return Math.round(value / gridSize) * gridSize;
            }

            // Écouteur pour suivre les mouvements
            function onPointerMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('pointermove', onPointerMove);

            item.addEventListener(
                'pointerup',
                function () {

                    document.removeEventListener('pointermove', onPointerMove);

                    if (!isMoved) return;

                    const currentLeftVW = parseFloat(item.style.left);
                    const currentTopVH = parseFloat(item.style.top);

                    const gridWidthVW = stepWidth; 
                    const gridHeightVH = stepHeight; 

                    const snappedLeftVW = snapToGrid(currentLeftVW, gridWidthVW);
                    const snappedTopVH = snapToGrid(currentTopVH, gridHeightVH);
                   
                    if (snappedLeftVW <= minWidth) item.style.left = `${minWidth}vw`;
                    else if (snappedLeftVW >= maxWidth) item.style.left = `${maxWidth}vw`;
                    else{item.style.left = `${snappedLeftVW}vw`}

                    if (snappedTopVH <= minHeight) item.style.top = `${minHeight}vh`;
                    else if (snappedTopVH >= maxHeight) item.style.top = `${maxHeight}vh`;
                    else{item.style.top = `${snappedTopVH}vh`;}
                    
                },
                { once: true }
            );
        

        item.ondragstart = () => false;
    });
}

export function initialize(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth) {
    positionMenuItems(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth);
    enableDrag(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth);
}