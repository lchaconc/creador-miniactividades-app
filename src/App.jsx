import { useState, useEffect } from "react";
import Login from "./componentes/Login";
import Menu from "./componentes/Menu";
import DndImagenArea from "./componentes/DndImagenArea";
import { sendData } from "gespro-utils";
import {eGenericos} from "./_endpoints";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [compActual, setCompActual] = useState("menu");
  const [isLoading, setIsLoading] = useState(false);

  const handleCargarForm = async (e) => {
    const idVista = e.target.id;
    console.log("idVista --------", idVista);
    const data = { nombrePlantilla: idVista };
    setIsLoading(true);
    const res = await sendData(eGenericos.crearProyecto, data, "POST");
    sessionStorage.setItem("idApp", res.idApp);
    setIsLoading(false);
    setCompActual(componentes[idVista]);
  };

  const componentes = {
    menu: <Menu handleCargarForm={handleCargarForm} />,
    dnd_imagen_area: <DndImagenArea />,
  };

  const handleLogin = () => {
    console.log("login");
    setUsuario({
      username: "luis.chacon.campos@mep.go.cr",
    });
    setCompActual(componentes.menu);
  };

  return (
    <>
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
    </>
  );
}

export default App;
