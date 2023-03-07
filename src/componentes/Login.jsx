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
                <button className="btn btn-outline-info" onClick={handleLogin} >INICIAR SESIÓN</button>
            </div>
        </div>
      </div>
    )
    
};
