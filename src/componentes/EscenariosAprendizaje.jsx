import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import addDragAndDrop from "../utils/draggable";
import resize from "../utils/resize";
import { v4 as uuidv4 } from "uuid";

export default function EscenariosAprendizaje() {
  const [show, setShow] = useState(false);
  const [imgPrevia, setImgPrevia] = useState({
    id: null,
    base64: null,
    file: null,
  });
  const [imgFondo, setImgFondo] = useState(null);
  const [sprites, setSprites] = useState([]);
  const [tipoModal, setTipoModal] = useState(null);
  const [spriteActual, setSpriteActual] = useState(null);

  const refMenuContextual = useRef(null);

  useEffect(() => {
    console.log(tipoModal);
  }, [tipoModal]);

  useEffect(() => {
    console.log(sprites);
  }, [sprites]);

  const handleClose = () => setShow(false);

  const handleLoadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setImgPrevia({
          id: uuidv4(),
          base64: reader.result,
          file: file,
        });
      });

      reader.readAsDataURL(file);
    }
  };

  function handeGuardarImg() {
    if (tipoModal === "fondo") {
      console.log(imgPrevia);
      setImgFondo(imgPrevia.base64);
    }

    if (tipoModal === "sprite") {
      setSprites([
        // with a new array
        ...sprites, // that contains all the old items
        { id: imgPrevia.id, base64: imgPrevia.base64, file: imgPrevia.file }, // and one new item at the end
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
      //console.log("spriteActual", spriteActual);
      setImgPrevia(spriteActual);
    } else {
      setImgPrevia(null);
    }
  };

  const handleAbrirMenucontextual = (e) => {
    console.log(e.target);
    const boundingRect = e.target.getBoundingClientRect();
    console.log("Left:", boundingRect.left);
    console.log("Top:", boundingRect.top);
    console.log("Height:", boundingRect.height);
    console.log("Width:", boundingRect.width);

    // Obtener dimensiones del viewport
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Convertir dimensiones a vh y vw
    const heightInVh = (boundingRect.height / viewportHeight) * 100;
    const widthInVw = (boundingRect.width / viewportWidth) * 100;

    console.log("Height (vh):", heightInVh);
    console.log("Width (vw):", widthInVw);

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
                    id={item.id}
                    onMouseDown={addDragAndDrop}
                    onContextMenu={handleAbrirMenucontextual}
                    className="img-sprite"
                    src={item.base64}
                    alt={item.file.name}
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
                  src={imgPrevia.base64}
                  alt="Vista previa de la imagen"
                ></img>
              </div>
            </div>
          )}

          {tipoModal === "redim" && (
            <>
              <br />
              <label htmlFor="customRange1" className="form-label">
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
