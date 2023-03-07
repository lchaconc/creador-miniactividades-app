import { useState, useEffect } from 'react'
import Login from './componentes/Login';
import Menu from './componentes/Menu';
import DndImagenArea from './componentes/DndImagenArea';


function App() {
  const [usuario, setUsuario] = useState(null);
  const [compActual, setCompActual] = useState("menu");


  const handleCambiarVistas =(e)=> {
    const idVista = e.target.id; 
    console.log(idVista);
    setCompActual(componentes[idVista])

  } 

  const componentes = {
    menu: <Menu handleCambiarVistas={handleCambiarVistas} />,
    "dnd-imagen-area" : <DndImagenArea handleCambiarVistas={handleCambiarVistas} />
  } 

  const handleLogin =()=> {
    console.log("login");
    setUsuario({
      username: "luis.chacon.campos@mep.go.cr"
    })
    setCompActual(componentes.menu)
  }



  useEffect(() => {
    console.log(compActual);
  }, [compActual]);

 

  return (
    !usuario ? <Login handleLogin={handleLogin} /> : compActual 
  )
}

export default App
