import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import addDragAndDrop from "../utils/draggable";

let nextId = 0;

export default function EscenariosAprendizaje(props) {
  const [show, setShow] = useState(false);
  const [imgPrevia, setImgPrevia] = useState(null);
  const [imgFondo, setImgFondo] = useState(null);
  const [sprites, setSprites] = useState([]);
  const [tipoModal, setTipoModal] = useState(null);
  const [spriteActual, setSpriteActual] = useState(null);

  const refMenuContextual = useRef(null);

  useEffect(() => {
    console.log(tipoModal);
  }, [tipoModal]);

  const handleClose = () => setShow(false);

  const handleLoadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setImgPrevia(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  function handeGuardarImg() {
    if (tipoModal === "fondo") {
      setImgFondo(imgPrevia);
    }

    if (tipoModal === "sprite") {
      setSprites([
        // with a new array
        ...sprites, // that contains all the old items
        { id: nextId++, sprite: imgPrevia }, // and one new item at the end
      ]);
    }

    setShow(false);
  }

  const handleAbrirModal = (e) => {
    console.log("Abrindo modal en modo", tipoModal);
    refMenuContextual.current.style.display = "none";
    setTipoModal(e.target.dataset.modal);
    setShow(true);
    if (tipoModal === "redim") {
      console.log("spriteActual", spriteActual);
      setImgPrevia(spriteActual);
    } else {
      setImgPrevia(null);
    }
  };

  const handleAbrirMenucontextual = (e) => {
    console.log(e.target);
    setSpriteActual(sprites[0].sprite);
    e.preventDefault();
    refMenuContextual.current.style.display = "block";
    refMenuContextual.current.style.left = e.pageX + "px";
    refMenuContextual.current.style.top = e.pageY + "px";
  };

  const handleCerrarMenu = () => {
    refMenuContextual.current.style.display = "none";
  };

  const estilofondo = {
    backgroundImage: `url(${imgFondo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Escenarios de aprendizaje</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              id="btnFondo"
              data-modal="fondo"
              className="btn btn-info"
              onClick={handleAbrirModal}
            >
              Agreggar Fondo
            </button>
            <button
              id="btnSprite"
              data-modal="sprite"
              onClick={handleAbrirModal}
              className="btn btn-success"
            >
              {" "}
              Agregar sprite{" "}
            </button>
          </div>
        </div>

        <div className="row">
          {imgFondo && (
            <div
              id="divFondo"
              onClick={handleCerrarMenu}
              className="col-12"
              style={estilofondo}
            >
              {sprites &&
                sprites.map((item) => (
                  <img
                    key={item.id}
                    onMouseDown={addDragAndDrop}
                    onContextMenu={handleAbrirMenucontextual}
                    className="img-sprite"
                    src={item.sprite}
                    alt="sprite"
                  />
                ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        size={tipoModal === "fondo" ? "xl" : "sm"}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {tipoModal === "fondo" ? "Fondo" : "Sprite"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(tipoModal === "fondo" || tipoModal === "sprite") && (
            <div className="row">
              <div className="col-12 text-center">
                <input type="file" id="inputFile" onChange={handleLoadFile} />
              </div>
            </div>
          )}

          <hr />
          {imgPrevia && (
            <div className="row">
              <div className="col-12 text-center">
                <img
                  className="img-fluid"
                  id="imagePreview"
                  src={imgPrevia}
                  alt="Vista previa de la imagen"
                ></img>
              </div>
            </div>
          )}

          {tipoModal === "redim" && (
            <>
              <br />
              <label for="customRange1" className="form-label">
                Redimensión <strong>50%</strong>
              </label>
              <input
                type="range"
                className="form-range"
                id="customRange1"
              ></input>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handeGuardarImg} className="btn btn-outline-info">
            Aceptar
          </button>
        </Modal.Footer>
      </Modal>

      <div id="menuContextual" ref={refMenuContextual} className="context-menu">
        <ul className="context-menu__items">
          <li className="context-menu__item">Eliminar 🗑️ </li>
          <li
            className="context-menu__item"
            onClick={handleAbrirModal}
            data-modal="redim"
          >
            Redimensionar 📐
          </li>
          <li className="context-menu__item">Editar acción 🎯 </li>
          <li className="context-menu__item">Cambiar propiedades 🚧 </li>
        </ul>
      </div>
    </>
  );
}
