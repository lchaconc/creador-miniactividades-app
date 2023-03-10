import React, { useState, useEffect, useContext } from "react";
import CtxUsurio from "../context/ctxUsuario";
import { getData } from "gespro-utils";
import { eGenericos } from "../_endpoints";

export default function MisProyectos() {
  const [dndImagenArea, setDndImagenArea] = useState(null);
  const usuario = useContext(CtxUsurio);

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    console.log("dndImagenArea", dndImagenArea);
  }, [dndImagenArea]);

  const setup = async () => {
    console.log("usuario desde contexto >>>", usuario);
    const res = await getData(eGenericos.misProyectos + usuario.username);
    console.log(res);
    setDndImagenArea(res.dndImagenArea);
  };

  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col-12 jumbotron">
          <h1>Mis proyectos</h1>
        </div>
      </div>

      {dndImagenArea &&
        dndImagenArea.map(({ _id, textos, tipo }) => (
          <div key={_id} className="row alert alert-light">
            <div className="col-10 ">
              <h3>{textos.titulo} </h3>
              <span className="badge text-bg-primary">{tipo}</span>
            </div>
            <div className="col-2 text-end">
              <img  
              role={"button"}
              title="Ver detalles"
              className="img-m" src="./assets/pantalla.png" alt="ver" />
            </div>
          </div>
        ))}
    </div>
  );
}
