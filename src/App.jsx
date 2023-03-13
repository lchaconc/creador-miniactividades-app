import { useState, useEffect } from "react";
import Login from "./componentes/Login";
import Menu from "./componentes/Menu";
import MisProyectos from "./componentes/MisProyectos";
import DndImagenArea from "./componentes/DndImagenArea";
import { sendData } from "gespro-utils";
import {eGenericos} from "./_endpoints";
import CtxUsurio from "./context/ctxUsuario";
import "animate.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [compActual, setCompActual] = useState("menu");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("usuario", usuario);
  }, [usuario]);

  const handleCargarForm = async (e) => {
    const idVista = e.target.id;
    console.log("idVista --------", idVista);
    const data = { nombrePlantilla: idVista };
    setIsLoading(true);
    const res = await sendData(eGenericos.crearProyecto, data, "POST");
    sessionStorage.setItem("idApp", res.idApp);
    sessionStorage.setItem( "modo", "insertar" );
    setIsLoading(false);
    setCompActual(componentes[idVista]);
  };


  const cargarDetallesActividad =(idVista)=> {    
    sessionStorage.setItem( "modo", "editar" );
    console.log("id", idVista);
    setCompActual(componentes[idVista]);

  }

  const cargarVistasGenericas =(e)=> {
    const idVista = e.target.id;
    setCompActual(componentes[idVista]);
  }



  const handleLogin = () => {
    console.log("login");
    const tmpUsr = {
      name: "Luis",
      username: "luis.chacon.campos@mep.go.cr",            
      token: "123456789abc",
      blobPhoto: "foto",
      handleCerrarSesion: "sso.signOut"
    }
    setUsuario( tmpUsr);     
    setCompActual(componentes["menu"]);
  };


 

  const componentes = {
    menu: <Menu handleCargarForm={handleCargarForm}  cargarVistasGenericas={cargarVistasGenericas}  />,
    dnd_imagen_area: <DndImagenArea cargarVistasGenericas={cargarVistasGenericas} />,
    mis_proyectos: < MisProyectos  cargarDetallesActividad={cargarDetallesActividad} />
  };

  return (
    
      <CtxUsurio.Provider value={usuario}>
      {!usuario ? <Login handleLogin={handleLogin} /> : compActual}
      {isLoading && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-warning">              
              Cargando datos. Por favor espere...
            </div>
          </div>
        </div>
      )}
    </CtxUsurio.Provider>
  );
}

export default App;
