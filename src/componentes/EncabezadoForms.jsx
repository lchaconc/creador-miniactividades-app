export default function EncabezadoForms(props) {


    return (
        <div className="row jumbotron">
        <div className="col-10">
            <h2> {props.children} </h2>
        </div>
        <div className="col-2 text-end pt-2">
            <img 
            role={"button"}
            id="menu"
            className="btn-jello"            
            onClick={props.cargarVistasGenericas}
            src="./assets/home.png" alt="icono de casa"  />
        </div>
    </div>
    )
        
       
        
    
    
};
