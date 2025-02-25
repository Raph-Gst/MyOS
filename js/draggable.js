
export function getRandomPosition(min, max, step) {
    let randomValue = Math.round((Math.random() * (max - min) + min) / step) * step;
    return randomValue;
}

export function positionMenuItems(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth) {
    const menuItems = document.querySelectorAll('.menu_item');

    const usedPositions = [];

    // Récupérer la position et la taille du widget en pixels
    const widget = document.getElementById('eye_widget');
    if (!widget) {

        return;
    }

    const widgetRect = widget.getBoundingClientRect();

    // Convertir en vw/vh
    const widgetBounds = {
        left: (widgetRect.left / window.innerWidth) * 100,  // en vw
        top: (widgetRect.top / window.innerHeight) * 100,   // en vh
        width: (widgetRect.width / window.innerWidth) * 100,  // en vw
        height: (widgetRect.height / window.innerHeight) * 100 // en vh
    };

    widgetBounds.right = widgetBounds.left + widgetBounds.width;
    widgetBounds.bottom = widgetBounds.top + widgetBounds.height;

    menuItems.forEach((item, index) => {
        let left, top;
        let tries = 0; // Pour éviter une boucle infinie

        do {
            left = getRandomPosition(minWidth, maxWidth, stepWidth);
            top = getRandomPosition(minHeight, maxHeight, stepHeight);

            tries++;
            if (tries > 100) {
                console.warn("Trop d'essais, sortie de la boucle pour éviter une boucle infinie");
                break;
            }
        } while (
            // Vérifier si la position chevauche le widget
            (left + 10 > widgetBounds.left && left < widgetBounds.right &&
             top + 7 > widgetBounds.top && top < widgetBounds.bottom) ||
            // Vérifier si la position est déjà utilisée
            usedPositions.some(pos => pos.left === left && pos.top === top)
        );

        usedPositions.push({ left, top });

        item.style.left = `${left}vw`;
        item.style.top = `${top}vh`;
    });
}




export function enableDrag(minHeight, minWidth, maxHeight, maxWidth, stepHeight, stepWidth) {
    
    document.addEventListener('pointerdown', function (e) {
        let item = e.target.closest(`.menu_item`);

        if (!item) return;

        const rect = item.getBoundingClientRect();
        const shiftX = e.clientX - rect.left;
        const shiftY = e.clientY - rect.top;
        let isMoved = false;

        function moveAt(pageX, pageY) {
            const newLeft = pageX - shiftX;
            const newTop = pageY - shiftY;

            const newLeftVW = (newLeft / window.innerWidth) * 100;
            const newTopVH = (newTop / window.innerHeight) * 100;

            item.style.left = `${newLeftVW - 7}vw`;
            item.style.top = `${newTopVH - 10}vh`;

            isMoved = true;
        }

        function snapToGrid(value, gridSize) {
            return Math.round(value / gridSize) * gridSize;
        }

        function onPointerMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('pointermove', onPointerMove);

        document.addEventListener(
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
                else item.style.left = `${snappedLeftVW}vw`;

                if (snappedTopVH <= minHeight) item.style.top = `${minHeight}vh`;
                else if (snappedTopVH >= maxHeight) item.style.top = `${maxHeight}vh`;
                else item.style.top = `${snappedTopVH}vh`;
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