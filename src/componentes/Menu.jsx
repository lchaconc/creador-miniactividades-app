import actividades from "../data/actividades.json";

export default function Menu({handleCambiarVistas}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>MENU</h1>
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
                className="btn btn-outline-info" 
                onClick={handleCambiarVistas}
                >Crear actividad</button>  
                </div>            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
