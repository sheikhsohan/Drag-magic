const body = document.body;
const tutorial = document.getElementById('tutorial');
const footer = document.getElementById('footer');
const circle = document.createElement('div');
circle.className = 'drag-circle';
body.appendChild(circle);

let isDragging = false;
let touchOffsetX = 0;
let touchOffsetY = 0;
let dragEndX = 0;
let dragEndY = 0;

// Mouse events
body.addEventListener('mousedown', function(event) {
  event.preventDefault();
  isDragging = true;
  hideTutorial();
  const xPos = event.clientX;
  const yPos = event.clientY;
  startDragging(xPos, yPos);
});

body.addEventListener('mouseup', function(event) {
  event.preventDefault();
  isDragging = false;
  showTutorial();
  hideCircle();
  dragEndX = event.clientX;
  dragEndY = event.clientY;
  moveCircle(dragEndX, dragEndY);
});

body.addEventListener('mousemove', function(event) {
  event.preventDefault();
  if (isDragging) {
    const xPos = event.clientX;
    const yPos = event.clientY;
    moveDraggedElement(xPos, yPos);
    const color = getColor(xPos, yPos);
    createTrail(xPos, yPos, color);
    updateFooterColor(color);
    moveCircle(xPos, yPos);
  }
});

// Touch events
body.addEventListener('touchstart', function(event) {
  event.preventDefault();
  const touch = event.touches[0];
  isDragging = true;
  hideTutorial();
  const xPos = touch.clientX;
  const yPos = touch.clientY;
  startDragging(xPos, yPos);
});

body.addEventListener('touchmove', function(event) {
  event.preventDefault();
  if (isDragging) {
    const touch = event.touches[0];
    const xPos = touch.clientX;
    const yPos = touch.clientY;
    moveDraggedElement(xPos, yPos);
    const color = getColor(xPos, yPos);
    createTrail(xPos, yPos, color);
    updateFooterColor(color);
    moveCircle(xPos, yPos);
  }
});

body.addEventListener('touchend', function(event) {
  event.preventDefault();
  isDragging = false;
  showTutorial();
  hideCircle();
  const touch = event.changedTouches[0];
  dragEndX = touch.clientX;
  dragEndY = touch.clientY;
  moveCircle(dragEndX, dragEndY);
});

function startDragging(x, y) {
  const draggedElement = document.createElement('div');
  draggedElement.className = 'dragged-element';
  draggedElement.style.left = `${x}px`;
  draggedElement.style.top = `${y}px`;
  body.appendChild(draggedElement);
  touchOffsetX = x - draggedElement.getBoundingClientRect().left;
  touchOffsetY = y - draggedElement.getBoundingClientRect().top;
  draggedElement.style.cursor = 'grabbing';
}

function moveDraggedElement(x, y) {
  const draggedElement = document.querySelector('.dragged-element');
  draggedElement.style.left = `${x - touchOffsetX}px`;
  draggedElement.style.top = `${y - touchOffsetY}px`;
}

function moveCircle(x, y) {
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}

function getColor(x, y) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const red = Math.round((x / width) * 255);
  const green = Math.round((y / height) * 255);
  const blue = Math.round((x / width) * (y / height) * 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

function createTrail(x, y, color) {
  const trailSize = 20;
  const trail = document.createElement('div');
  trail.className = 'trail';
  trail.style.backgroundColor = color;
  trail.style.left = `${x}px`;
  trail.style.top = `${y}px`;
  body.appendChild(trail);
  setTimeout(function() {
    trail.style.opacity = '0';
  }, 50);
  setTimeout(function() {
    body.removeChild(trail);
  }, 1000);
}

function hideTutorial() {
  tutorial.style.display = 'none';
}

function showTutorial() {
  tutorial.style.display = 'block';
}

function hideCircle() {
  circle.style.display = 'none';
}

function updateFooterColor(color) {
  footer.style.backgroundImage = `linear-gradient(to right, ${color}, #00ff00)`;
}
