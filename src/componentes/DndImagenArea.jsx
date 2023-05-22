import React, { useRef, useState, useEffect } from "react";
import { sendData, getData, sendFormData } from "gespro-utils";
import { eGenericos, eDnDImagenArea } from "../_endpoints";
import Accordion from "react-bootstrap/Accordion";
import EncabezadoForms from "./EncabezadoForms";

let idApp;

export default function DndImagenArea({cargarVistasGenericas}) {
  const refTextosTitulo = useRef();
  const refTextosInstrucciones = useRef();
  const refRetroCorrecta = useRef();
  const refRetroincorrecta = useRef();
  const refTituloArea = useRef();
  const refColorAreaFondo = useRef();
  const refColorAreaTexto = useRef();
  const refImagen = useRef();
  const refTextoAlternativo = useRef();
  const refIdArea = useRef();

  const [textos, setTextos] = useState(null);
  const [areas, setAreas] = useState(null);
  const [imagenes, setImagenes] = useState(null);

  //si el usuario cambia algo en los textos se activa para mostrar el diskete (indica que hay que guardar)
  const [isTextoPorGuardar, setIsTextoPorGuardar] = useState(false);
  const [isGuardadnoTexto, setIsGuardadnoTexto] = useState(false);

  const [isAreaPorGuardar, setIsAreaPorGuardar] = useState(false);

  const urlImagenes = "http://localhost:3500/proy/";

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    cargarTextos();
  }, [textos]);

  useEffect(() => {
    //console.log("AREAS", areas);
  }, [areas]);

  useEffect(() => {
    console.log("idApp", idApp);
  }, [idApp]);

  const setup = async () => {
    const modo = sessionStorage.getItem("modo");
    if (modo === "insertar") {
      console.log("<<<< INSERTAR >>>>");
      idApp = sessionStorage.getItem("idApp");
    }
    if (modo === "editar") {
      console.log("Editar");
      const appSeleccionada = JSON.parse(
        sessionStorage.getItem("appSeleccionada")
      );
      setTextos(appSeleccionada.textos);
      setAreas(appSeleccionada.areas);
      setImagenes(appSeleccionada.cajas);
      idApp = appSeleccionada._id;
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
    setIsGuardadnoTexto(true);
    console.log("datos a enviar al servidor", data);
    const res = await sendData(eDnDImagenArea.textos + idApp, data);
    console.log(res);
    res.isOk && setIsTextoPorGuardar(false);
    setIsGuardadnoTexto(false);
  };

  const handleCrearArea = async () => {
    const data = {
      titulo: refTituloArea.current.value,
      backgroundColor: refColorAreaFondo.current.value,
      color: refColorAreaTexto.current.value,
    };
    console.log("Datos a enviar", data);
    const res = await sendData(eDnDImagenArea.areas + idApp, data, "POST");
    console.log("res", res);

    //REacarga nuevamente las areas con datos del backend
    //setAreas(await getData(eDnDImagenArea.areas+idApp ));
    //Carga el estado de la respuesta del
    setAreas(res.areas);
    //Limpia el texto del input
    refTituloArea.current.value = ""
  };

  const handleEliminarArea = async (e) => {
    const data = {
      id: e.currentTarget.id,
    };
    console.log("datos a enviar en eliminar area:", data);
    const res = await sendData(eDnDImagenArea.areas + idApp, data, "DELETE");
    console.log(res);
    setAreas(res.areas);
  };

  const handleInsertarImagen = async () => {
    const image = refImagen.current.files[0];
    const alt = refTextoAlternativo.current.value;
    const idArea = refIdArea.current.value;
    console.log("CAJA >>>", image, alt, idArea);

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("alt", alt);
    formdata.append("idArea", idArea);

    const res = await sendFormData(
      eDnDImagenArea.cajas + idApp,
      formdata,
      "POST"
    );
    console.log("res", res);
    setImagenes(res.imagenes);

    refImagen.current.value = "";
    refTextoAlternativo.current.value = "";

  };

  const handleEliminarImagen = async (e) => {
    const data = { idCaja: e.target.id };
    const res = await sendData(eDnDImagenArea.cajas + idApp, data, "DELETE");
    console.log("res", res);
    setImagenes(res.imagenes);
  };

  const handlePreview = async () => {
    if (idApp) {
      const res = await getData(`${eGenericos.verProyecto}${idApp}/dnd_imagen_area`);
      console.log("res", res);
      window.open(res.url, "_blank");
    }
  };

  const handleBuild = async () => {
    if (idApp) {
      const res = await getData( `${eGenericos.genererProyecto}${idApp}/dnd_imagen_area` );
      window.open(res.url, "_blank");
    }
  };

  return (
    <div className="container">
      <EncabezadoForms cargarVistasGenericas={cargarVistasGenericas}>
        Drag and drop imagen-area
      </EncabezadoForms>

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
            alt="nube de descarga"
          />
        </div>
        <div className="col-1 text-end">
          <img
            role={"button"}
            onClick={handlePreview}
            className="img-fluid"
            src="/assets/play.png"
            alt="boón play"
          />
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
                  <div className="col-10 text-end">
                    {
                      isGuardadnoTexto && <div className="badge text-bg-success">
                        Guardando texto. Por favor espere....
                      </div>
                    }
                  </div>
                  {isTextoPorGuardar && (
                    <div className="col-2 text-end">
                      <img
                        src="/assets/diskette.png"
                        alt="diskete con carpeta"
                        role="button"
                        className="img-fluid animate__animated animate__bounce"
                        onClick={handleEnviarTextos}
                      />
                    </div>
                  )}
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
                        onChange={ ()=> setIsTextoPorGuardar(true) }
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
                        onChange={ ()=> setIsTextoPorGuardar(true) }
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
                        onChange={ ()=> setIsTextoPorGuardar(true) }
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
                        onChange={ ()=> setIsTextoPorGuardar(true) }
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
                            onChange={ ()=> setIsAreaPorGuardar(true) }
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
                    {
                      isAreaPorGuardar && 
                      <div className="col-12 text-end">
                      <img
                        src="/assets/diskette.png"
                        alt="diskete con carpeta"
                        role="button"
                        className="img-fluid"
                        onClick={handleCrearArea}
                      />
                    </div>
                    }
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <strong>IMÁGENES</strong>
              </Accordion.Header>
              <Accordion.Body>
                <div className="row mb-2">
                  {imagenes &&
                    imagenes.map((imagen, i) => (
                      <div key={"img" + i} className="col-2">
                        <div className="card">
                          <div className="card-title text-center">
                            <div className="row mt-1">
                              <div className="col-10">
                                <h4>{imagen.alt}</h4>
                              </div>
                              <div className="col-2">
                                <img
                                  id={imagen.id}
                                  role={"button"}
                                  src="./assets/remove.png"
                                  alt="equis roja"
                                  title="Remover imagen"
                                  onClick={handleEliminarImagen}
                                />
                              </div>
                            </div>
                          </div>
                          <img
                            src={
                              urlImagenes +
                              idApp +
                              "/public/assets/" +
                              imagen.id
                            }
                            className="img-fluid"
                            alt="preva de imagen"
                          />
                          <div className="card-body">
                            <p className="card-text">
                              <strong> {imagen.tituloArea} </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="row">
                  <div className="col-12 alert alert-secondary">
                    Agregar imagen +
                    <div className="row">
                      <div className="col-12">
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <img
                              id="inputGroupFileImg"
                              src="./assets/gallery.png"
                              alt="imagen"
                            />
                          </span>
                          <input
                            type="file"
                            id="image"
                            className="form-control"
                            aria-label="Título de area"
                            aria-describedby="inputGroupFileImg"
                            ref={refImagen}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="input-group mb-3">
                          <span
                            className="input-group-text"
                            id="inputGroupAlternativo"
                          >
                            Texto alternativo:
                          </span>
                          <input
                            type="text"
                            id="txtAlternativoImagen"
                            className="form-control"
                            aria-label="Texto alternativo de la imagen"
                            aria-describedby="inputGroupAlternativo"
                            ref={refTextoAlternativo}
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="input-group mb-3">
                          <span
                            className="input-group-text"
                            id="inputGroupAlternativo"
                          >
                            Area:
                          </span>

                          <select
                            ref={refIdArea}
                            className="fomr-control"
                            id="inputIdArea"
                          >
                            {areas &&
                              areas.map((area) => (
                                <option key={area._id} value={area._id}>
                                  {area.titulo}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-end">
                        <img
                          src="/assets/diskette.png"
                          alt="diskete con carpeta"
                          role="button"
                          className="img-fluid"
                          onClick={handleInsertarImagen}
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
