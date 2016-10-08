// /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
// animated scroll on click of chevron-down on landing page
// /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-

var scrollY = 0;
var distance = 5;
var speed = 2;

function autoScrollTo(el) {
    var currentY = window.pageYOffset;
    var targetY = document.getElementById(el).offsetTop;
    var bodyHeight = document.body.offsetHeight;
    var yPos = currentY + window.innerHeight;

    var animator = setTimeout('autoScrollTo(\'' + el + '\')', speed);

    if (yPos > bodyHeight) {
        clearTimeout(animator);
    } else {
        if (currentY < targetY - distance) {
            scrollY = currentY + distance;
            window.scroll(0, scrollY);
        } else {
            clearTimeout(animator);
        }
    }
}
// /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-


// /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
// activate / deactivate Google Map
// /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-

const map = document.getElementById('map');
const mapSection = document.getElementById('map-section');

mapSection.addEventListener('click', () => {
    console.log('foo');
    map.style.pointerEvents = 'all';
});

mapSection.addEventListener('blur', () => {
    console.log('bar');
    map.style.pointerEvents = 'none';
});