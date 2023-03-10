import React from 'react';

// set the defaults
const CtxUsurio = React.createContext({
  usuario:  {
    name: null,
    username: null,
    role: null,
    type: null,
    token: null,
    blobPhoto: null,
    handleCerrarSesion: null
  },
  setUsuario: () => { }
})
  
    
  
  


export default CtxUsurio;