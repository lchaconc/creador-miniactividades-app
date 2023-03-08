import React, { useRef, useState, useEffect } from "react";
import { sendData, getData } from "gespro-utils";
import { eGenericos, eDnDImagenArea } from "../_endpoints";
import Accordion from "react-bootstrap/Accordion";

const data = { nombrePlantilla: "dnd_imagen_area" };
let isFirst = true;

export default function DndImagenArea() {
  const modo = "insertar";

  const refTextosTitulo = useRef();
  const refTextosInstrucciones = useRef();
  const refRetroCorrecta = useRef();
  const refRetroincorrecta = useRef();
  const refTituloArea = useRef();
  const refColorAreaFondo = useRef();
  const refColorAreaTexto = useRef();

  const [textos, setTextos] = useState(null);
  const [areas, setAreas] = useState(null);
  const [idApp, setIdApp] = useState(null);


 

  useEffect(() => {
    if (isFirst) {       
        isFirst = false;
        setup();       
    }    
  }, []);



  useEffect(() => {
    cargarTextos();
  }, [textos]);

  useEffect(() => {
    //console.log("AREAS", areas);
  }, [areas]);

  useEffect(() => {
    console.log("idApp",idApp);
  }, [idApp]);

  const setup = async () => {
    console.log("setup");
    if (modo === "insertar") {
        console.log("<<<< INSERTAR >>>>");
      const res = await sendData(eGenericos.crearProyecto, data, "POST");
      setIdApp(await res.idApp);      
    }
    if (modo === "editar") {
      setTextos(await getData(eDnDImagenArea.textos));
      setAreas(await getData(eDnDImagenArea.areas));
    }
  };

  const cargarTextos = () => {
    //console.log("textos", textos);
    if (textos) {
      refTextosTitulo.current.value = textos.titulo;
      refTextosInstrucciones.current.value = textos.instrucciones;
      refRetroCorrecta.current.value = textos.retroCorrecta;
      refRetroincorrecta.current.value = textos.retroIncorrecta;
    }
  };

  const handleEnviarTextos = async () => {
    //console.log(refTextosTitulo.current.value );
    //console.log(refTextosInstrucciones.current.value);
    const data = {
      titulo: refTextosTitulo.current.value,
      instrucciones: refTextosInstrucciones.current.value,
      retroCorrecta: refRetroCorrecta.current.value,
      retroIncorrecta: refRetroincorrecta.current.value,
    };
    console.log("datos a enviar al servidor", data);
    const res = await sendData(eDnDImagenArea.textos+idApp, data);
    console.log(res);
  };

  const handleCrearArea = async () => {
    const data = {      
      titulo: refTituloArea.current.value,
      backgroundColor: refColorAreaFondo.current.value,
      color: refColorAreaTexto.current.value,
    };
    console.log("Datos a enviar", data);
    const res = await sendData(eDnDImagenArea.areas+idApp, data, "POST");
    console.log("res", res);

    //REacarga nuevamente las areas con datos del backend
    //setAreas(await getData(eDnDImagenArea.areas+idApp ));
    //Carga el estado de la respuesta del 
    setAreas(res.areas);
  };

  const handleEliminarArea = async (e) => {
    const data = {
      id: e.currentTarget.id,
    };
    console.log("datos a enviar en eliminar area:", data);
    const res = await sendData(eDnDImagenArea.areas+idApp, data, "DELETE");
    console.log(res);
    setAreas( res.areas );
  };

  const handlePreview = async ()=> {
    if (idApp) {
        const res = await getData ( eGenericos.verProyecto+idApp );
        window.open(res.url, '_blank');
    }

  }

  const handleBuild = async () => {
    if (idApp) {
      const res = await getData (eGenericos.genererProyecto+idApp);
      window.open(res.url, '_blank');      
    }

  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 alert alert-info text-center">
          <h1>Imagen - Área</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores enim
          esse vitae aliquam nesciunt, illum nam est atque aperiam sed ab
          doloremque molestiae porro ullam laborum sit, ducimus doloribus
          dolorem.
        </div>
      </div>

      <div className="row">
        <div className="col-11 text-end">
          <img 
          role={"button"}
          onClick={handleBuild}
          className="img-fluid"
          src="./assets/nube.png"           
          alt="nube de descarga" />
        </div>
        <div className="col-1 text-end">
            <img 
            role={"button"}
            onClick={handlePreview}            
            className="img-fluid" 
            src="/assets/play.png" alt="boón play" />          
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <strong>TEXTOS</strong>
              </Accordion.Header>
              <Accordion.Body>
                <div className="row">
                  <div className="col-12 text-end">
                    <img
                      src="/assets/diskette.png"
                      alt="diskete con carpeta"
                      role="button"
                      className="img-fluid"
                      onClick={handleEnviarTextos}
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="inputGroupTitulo">
                        Título:
                      </span>
                      <input
                        type="text"
                        id="txtTitulo"
                        className="form-control"
                        aria-label="T´tiulo de la actividad"
                        aria-describedby="inputGroupTitulo"
                        ref={refTextosTitulo}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text"
                        id="inputGroupInstrucciones"
                      >
                        Instrucciones:
                      </span>
                      <input
                        type="text"
                        id="txtInstrucciones"
                        className="form-control"
                        aria-label="T´tiulo de la actividad"
                        aria-describedby="inputGroupInstrucciones"
                        ref={refTextosInstrucciones}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text"
                        id="inputGroupRetroCorrecta"
                      >
                        Retroalimentación correcta:
                      </span>
                      <input
                        type="text"
                        id="txtInstrucciones"
                        className="form-control"
                        aria-label="Retroaimentación correcta"
                        aria-describedby="inputGroupRetroCorrecta"
                        ref={refRetroCorrecta}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text"
                        id="inputGroupRetroIncorrecta"
                      >
                        Retroalimentación incorrecta:
                      </span>
                      <input
                        type="text"
                        id="txtInstrucciones"
                        className="form-control"
                        aria-label="T´tiulo de la actividad"
                        aria-describedby="inputGroupRetroIncorrecta"
                        ref={refRetroincorrecta}
                      />
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <strong>ÁREAS</strong>
              </Accordion.Header>
              <Accordion.Body>
                {areas &&
                  areas.map((item) => (
                    <div className="row" key={item._id}>
                      <div
                        className="col-10 pl-2 pt-2 mt-2 mb-2"
                        style={{ backgroundColor: item.backgroundColor }}
                      >
                        <h3 style={{ color: item.color }}>{item.titulo}</h3>
                      </div>
                      <div
                        style={{ backgroundColor: item.backgroundColor }}
                        className="col-2 pl-2 pt-2 mt-2 mb-2 text-end"
                      >
                        <img
                          id={item._id}
                          role={"button"}
                          onClick={handleEliminarArea}
                          className="ico-s"
                          src="/assets/trash.png"
                          alt="basurero"
                          title="Eliminar area"
                        />
                      </div>
                    </div>
                  ))}
                <div className="row">
                  <div className="col-12 alert alert-secondary">
                    Agregar área +
                    <div className="row">
                      <div className="col-12">
                        <div className="input-group mb-3">
                          <span
                            className="input-group-text"
                            id="inputGroupTituloArea"
                          >
                            Título:
                          </span>
                          <input
                            type="text"
                            id="txtTituloArea"
                            className="form-control"
                            aria-label="Título de area"
                            aria-describedby="inputGroupTituloArea"
                            ref={refTituloArea}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label className="m-2" htmlFor="inpColorAreaFondo">
                          Seleccione el color de fondo:
                        </label>
                        <input
                          type="color"
                          id="inpColorAreaFondo"
                          className=""
                          aria-label="Color de fondo del área"
                          aria-describedby="inpColorAreaFondo"
                          ref={refColorAreaFondo}
                        />
                      </div>

                      <div className="col-6">
                        <label className="m-2" htmlFor="inpColorAreaTexto">
                          Seleccione el color del texto:
                        </label>
                        <input
                          type="color"
                          id="inpColorAreaTexto"
                          className=""
                          aria-label="Título de area"
                          aria-describedby="inpColorAreaTexto"
                          ref={refColorAreaTexto}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-end">
                        <img
                          src="/assets/diskette.png"
                          alt="diskete con carpeta"
                          role="button"
                          className="img-fluid"
                          onClick={handleCrearArea}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
