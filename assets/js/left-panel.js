const resizer = document.getElementById('resizer');
const leftPanel = document.getElementById('left-panel');
const mainContent = document.getElementById('main-content');

let isResizing = false;

resizer.addEventListener('mousedown', function(e) {
  isResizing = true;
  leftPanel.style.userSelect = 'none';
  mainContent.style.userSelect = 'none';
  document.addEventListener('mousemove', resizePanel);
  document.addEventListener('mouseup', stopResizing);
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
}
