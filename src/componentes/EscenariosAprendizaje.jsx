import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

let nextId = 0;

export default function EscenariosAprendizaje(props) {
  const [show, setShow] = useState(false);
  const [imgPrevia, setImgPrevia] = useState(null);
  const [imgFondo, setImgFondo] = useState(null);
  const [sprites, setSprites] = useState([]);
  const [tipoModal, setTipoModal] = useState(null);

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
        setImgPrevia(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  function handeGuardarImg() {
    if (tipoModal === "btnFondo") {
      setImgFondo(imgPrevia);
    }

    if (tipoModal === "btnSprite") {
      setSprites([
        // with a new array
        ...sprites, // that contains all the old items
        { id: nextId++, sprite: imgPrevia }, // and one new item at the end
      ]);
    }

    setShow(false);
  }

  const handleAbrirModal = (e) => {
    setTipoModal(e.target.id);
    setShow(true);
    setImgPrevia(null);
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
              className="btn btn-info"
              onClick={handleAbrirModal}
            >
              Agreggar Fondo
            </button>
            <button
              id="btnSprite"
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
            <div id="divFondo" className="col-12" style={estilofondo}>
              {sprites &&
                sprites.map(
                  item => (<img key={item.id} src={item.sprite} alt="sprite" />)                  
                )}
            </div>
          )}
        </div>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" id="inputFile" onChange={handleLoadFile} />
          <hr />
          {imgPrevia && (
            <img
              className="img-fluid"
              id="imagePreview"
              src={imgPrevia}
              alt="Vista previa de la imagen"
            ></img>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handeGuardarImg} className="btn btn-outline-info">
            Aceptar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
