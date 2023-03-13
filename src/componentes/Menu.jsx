import actividades from "../data/actividades.json";

export default function Menu({handleCargarForm, cargarVistasGenericas }) {    

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <h1>MENU</h1>
        </div>
        <div className="col-4 text-end">
          <span>Mis Proyectos</span>
          <img
          id="mis_proyectos" 
          role={"button"}
          className="btn-jello"
          onClick={cargarVistasGenericas}
          src="./assets/folder.png" alt="folde en la nube"  />
        </div>
      </div>
      <div className="row">
        {actividades.map(({id, nombre, descripcion }) => (
          <div key={id} className="col-sm-4 card">
            <div className="card-header">
              <h3>{nombre} </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col text-center">
                  <img
                    className="img-fluid"
                    src={`/assets/${id}.png`}
                    alt={nombre}
                  />
                </div>
              </div>
              <p className="card-text">{descripcion}</p>
              <div className="col text-center">
              <button 
                id={id} 
                className="btn btn-outline-info btn-jello-c" 
                onClick={handleCargarForm}
                >Crear actividad</button>  
                </div>            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
