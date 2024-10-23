const resizer = document.getElementById('resizer');
const leftPanel = document.getElementById('left-panel');
const mainContent = document.getElementById('main-content');
const myButton = document.getElementById('btnReload');
const constantWidth = 225;

let isResizing = false;

resizer.addEventListener('mousedown', function (e) {
    isResizing = leftPanel.classList.contains('collapsed') ? false : true;
    leftPanel.style.userSelect = 'none';
    mainContent.style.userSelect = 'none';
    document.addEventListener('mousemove', resizePanel);
    document.addEventListener('mouseup', stopResizing);
    checkWidth();
});

function resizePanel(e) {
    if (!isResizing) return;
    const newWidth = e.clientX;
    leftPanel.style.width = newWidth + 'px';
}

function stopResizing() {
    isResizing = false;
    document.removeEventListener('mousemove', resizePanel);
    document.removeEventListener('mouseup', stopResizing);
    checkWidth();
}

function toggleIcon() {
    leftPanel.classList.toggle('collapsed');
    const icon = document.getElementById('icon');

    if (icon.classList.contains('bi-chevron-double-left')) {
        icon.classList.remove('bi-chevron-double-left');
        icon.classList.add('bi-chevron-double-right');
        icon.classList.add('rotate-right');
    } else {
        icon.classList.remove('bi-chevron-double-right');
        icon.classList.add('bi-chevron-double-left');
        icon.classList.add('rotate-left');
    }
}

function checkWidth() {
    const currentWidth = leftPanel.offsetWidth;

    if (currentWidth !== constantWidth) {
        myButton.classList.remove('invisible');
        myButton.classList.add('visible');
    } else {
        myButton.classList.remove('visible');
        myButton.classList.add('invisible');
    }
}

function resetLeftPanelSize() {
    leftPanel.style.width = constantWidth + 'px';
}

checkWidth();

window.addEventListener('resize', checkWidth);