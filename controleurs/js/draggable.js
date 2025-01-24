
export function getRandomPosition(min, max, step, usedPositions) {
    let randomValue;
    do {
        randomValue = Math.round((Math.random() * (max - min) + min) / step) * step;
    } while (usedPositions.includes(randomValue));
    return randomValue;
}

export function positionMenuItems() {
    const menuItems = document.querySelectorAll('.menu_item');
    const usedPositions = [];

    menuItems.forEach(item => {
        let left, top;

        do {
            left = getRandomPosition(12, 72, 12, usedPositions);
            top = getRandomPosition(10, 55, 10, usedPositions);
        } while (usedPositions.some(pos => pos.left === left && pos.top === top));

        usedPositions.push({ left, top });

        item.style.left = `${left}vw`;
        item.style.top = `${top}vh`;
    });
}


export function enableDrag() {
    document.querySelectorAll('.menu_item').forEach(item => {
        item.addEventListener('pointerdown', function (e) {
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

                    const gridWidthVW = 12; 
                    const gridHeightVH = 10; 

                    const snappedLeftVW = snapToGrid(currentLeftVW, gridWidthVW);
                    const snappedTopVH = snapToGrid(currentTopVH, gridHeightVH);

                    if (snappedLeftVW <= 10) item.style.left = `${10}vw`;
                    else if (snappedLeftVW >= 72) item.style.left = `${72}vw`;
                    else{item.style.left = `${snappedLeftVW}vw`}

                    if (snappedTopVH <= 12) item.style.top = `${12}vh`;
                    else if (snappedTopVH >= 55) item.style.top = `${55}vh`;
                    else{item.style.top = `${snappedTopVH}vh`;}
                    
                },
                { once: true }
            );
        });

        item.ondragstart = () => false;
    });
}

export function initialize() {
    positionMenuItems();
    enableDrag();
}