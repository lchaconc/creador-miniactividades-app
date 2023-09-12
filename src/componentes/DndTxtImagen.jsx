import EncabezadoForms from "./EncabezadoForms";

export default function DndTxtImagen({ cargarVistasGenericas }) {
  return (
    <div className="container">
      <EncabezadoForms cargarVistasGenericas={cargarVistasGenericas}>
        Arrastre y suelte "Texto - Imagen"
      </EncabezadoForms>
    </div>
  );
}
