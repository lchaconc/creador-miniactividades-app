import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function EscenariosAprendizaje(props) {
  const [show, setShow] = useState(false);
  const [previaImg, setPreviaImg] = useState(null);
  const [imgFondo, setImgFondo] = useState(null);
  

  const handleClose = () => setShow(false);
  

  const handleLoadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    //setIsBg(false);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setPreviaImg(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  function handleAceptarfondo() {
    setImgFondo(previaImg);    
    setShow(false)
    
  }

  const handleShowMdLoadImg = ()=> {    
    setShow(true);
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
            <button id="btnFondo" className="btn btn-info" onClick={handleShowMdLoadImg}>              
              Agreggar Imagen
            </button>
            <button 
            id="btnSprite"
            onClick={handleShowMdLoadImg}
            className="btn btn-success"> Agregar sprite </button>
          </div>
        </div>

        <div className="row">
            {
                (imgFondo ) &&
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
          {previaImg && (
            <img
                className="img-fluid"
              id="imagePreview"
              src={previaImg}
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
