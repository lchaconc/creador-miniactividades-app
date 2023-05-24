import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function EscenariosAprendizaje(props) {
  const [show, setShow] = useState(false);
  const [imgFondo, setImgFondo] = useState(null);
  const [isBg, setIsBg] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLoadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    //setIsBg(false);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setImgFondo(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  function handleAceptarfondo() {
    setIsBg(true);
    setShow(false)
    
  }

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
            <button id="btnFondo" className="btn btn-info" onClick={handleShow}>              
              Agreggar Imagen
            </button>
            <button 
            id="btnSprite"
            onClick={handleShow}
            className="btn btn-success"> Agregar sprite </button>
          </div>
        </div>

        <div className="row">
            {
                (imgFondo && isBg) &&
                <div className="col-12">
                <img 
                className="img-fluid"
                src={imgFondo} alt="Fondo" />
            </div>
            }
        </div>


      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" id="inputFile" onChange={handleLoadFile} />
          <hr />
          {imgFondo && (
            <img
                className="img-fluid"
              id="imagePreview"
              src={imgFondo}
              alt="Vista previa de la imagen"
            ></img>
          )}
        </Modal.Body>
        <Modal.Footer>
            <button 
            onClick={handleAceptarfondo}
            className="btn btn-outline-info" >Aceptar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
