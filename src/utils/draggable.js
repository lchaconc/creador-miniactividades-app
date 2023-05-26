let activeSprite = null;
let initialX = 0;
let initialY = 0;

export default function addDragAndDrop(e) {
    const sprite = e.target;
    sprite.addEventListener("mousedown", startDragging); 
}

function stopDragging(e) {
  if (activeSprite) {
    activeSprite.style.zIndex = "";
    activeSprite.style.pointerEvents = "";
    console.log(activeSprite.style.top);
    console.log(activeSprite.style.left);
    console.log(activeSprite.style.height);
    console.log(activeSprite.style.width);
    activeSprite = null;
    window.removeEventListener("mousemove", dragSprite);
    window.removeEventListener("mouseup", stopDragging); // Eliminar el evento de detener el arrastre
  }
}

function startDragging(event) {
  if (event.button === 0) {
    // Verificar que solo se arrastre con el botón izquierdo del mouse
    activeSprite = event.target;

    initialX = event.clientX - activeSprite.getBoundingClientRect().left;
    initialY = event.clientY - activeSprite.getBoundingClientRect().top;
    activeSprite.style.zIndex = "1000";
    activeSprite.style.pointerEvents = "none";
    window.addEventListener("mousemove", dragSprite);
    window.addEventListener("mouseup", stopDragging); // Agregar el evento de detener el arrastre al soltar el botón izquierdo
  }
}

function dragSprite(event) {
  if (activeSprite) {
    const containerRect = document
      .getElementsByClassName("container")[0]
      .getBoundingClientRect();

    const newLeft =
      ((event.clientX - containerRect.left - initialX) / containerRect.width) *
      100;
    const newTop =
      ((event.clientY - containerRect.top - initialY) / containerRect.height) *
      100;

    activeSprite.style.left = `${newLeft}vw`;
    activeSprite.style.top = `${newTop}vh`;
  }
}
