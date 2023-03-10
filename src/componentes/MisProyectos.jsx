import React, { useState, useEffect, useContext } from 'react';
import CtxUsurio from "../context/ctxUsuario";
import { getData } from "gespro-utils";
import {eGenericos} from "../_endpoints";





export default function MisProyectos() {

    const [misProyectos, setMisProyectos] = useState(null);
    const usuario = useContext(CtxUsurio);

    useEffect(() => {
       setup()
    }, []);


    const setup = async ()=> {        
        console.log("usuario desde contexto >>>", usuario);    
        const res = await getData( eGenericos.misProyectos+usuario.username );
        console.log(res);             
      }


    return (
        <h1>Mis proyectos</h1>
    )
    
};
