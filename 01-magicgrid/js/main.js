(function() {
    let $main = document.querySelector('main');

    function createGrid(gridSize, itemSize, gap) {
        let gridHtml = '';

        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                gridHtml += `<div class="item" data-hover-color="${getColorByPos(gridSize, x, y)}" style="width: ${itemSize}px; height: ${itemSize}px; left: ${ x * (itemSize + gap) }px; top: ${ y * (itemSize + gap) }px;"></div>`;

            }
        }

        return gridHtml;
    }

    function getColorByPos(max, x, y) {
        let r = parseInt(x / max * 255, 10);
        let g = parseInt(y / max * 255, 10);

        return `rgb(${r}, 0, ${g})`;
    }

    $main.innerHTML = createGrid(32, 10, 2);

    for (let item of document.querySelectorAll('.item')) {
        item.addEventListener('mouseover', function(event) {
            event.target.style.backgroundColor = event.target.dataset.hoverColor;
            event.target.style.transform = 'scale(3.5)';
            event.target.style.zIndex = '5';

            setTimeout(function() {
                event.target.style.backgroundColor = 'rgb(0, 0, 0)';
                event.target.style.transform = 'scale(1)';
                event.target.style.zIndex = '1';
            }, 400);
        });
    }
})();
