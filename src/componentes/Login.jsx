export default function Login({handleLogin}) {



    return (
        <div className="container">
        <div className="row jumbotron">
          <div className="col-12">
            <h1>Creador de miniactividades</h1>
          </div>
        </div>
        <div className="row">
            <div className="col-12 text-center">
                <button className="btn btn-outline-success animate__animated animate__rubberBand" onClick={handleLogin} >INICIAR SESIÓN</button>
            </div>
        </div>
      </div>
    )
    
};
