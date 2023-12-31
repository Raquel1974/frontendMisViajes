import Joi from "joi";
import { useToast } from "../../Hooks/useToast";
import { servicioCrearEntrada } from "../Api/servicioCrearEntrada";
import { Forms } from "../Components/Forms";
import { Input } from "../Components/Input";
import { InputSelect } from "../Components/InputSelect";
import { InputTextArea } from "../Components/InputTextArea";
import "../Styles/entradas.css";
import { InputMultiFotos } from "../Components/inputMultiFotos";
import { Toast } from "../Components/Toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { servicioConsultaEntrada } from "../Api/servicioConsultaEntrada";
import { servicioModificarEntrada } from "../Api/servicioModificarEntrada";
import { useGetLogin } from "../../Hooks/useGetLogin";
import { schemaModificarEntrada } from "../../utils/schemas";



export function ModificarEntrada() {
  const { toastData, showToast } = useToast();
  const [initialValue, setInitialValue] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const schema = schemaModificarEntrada;
  useGetLogin();

  useEffect(() => {
    async function consulta() {

        const data = await servicioConsultaEntrada(id);

        setInitialValue({
            titulo: data.titulo,
            categoria: data.categoria,
            lugar: data.lugar,
            texto: data.texto,
            foto: data.fotos
        })
    }
    consulta()
  }, [])

  const onSubmit = async (formValue) => {
    showToast(0, "", "");
    
    const resultado = await servicioModificarEntrada(id, formValue);

    if (resultado.status == "ok") {
      showToast(3000, "exito", resultado.message);
      setTimeout(() => {
        navigate(`/entradas/${id}`)
      }, 3000);
    } else {
      showToast(3000, "error", resultado.message);
    }
  };

  return (
    <main className="main-entradas">
      <h1>Modificar Entrada</h1>
      <Forms clase={"form-entradas"} onSubmit={onSubmit} schema={schema} initialValue={initialValue}>
        <div className="div-entradas">
          <Input
            name={"titulo"}
            clase={"input"}
            type={"text"}
            label={"Titulo:"}
            autocomplete={"off"}
          />
          <InputSelect clase={"select"} label={"Categoria:"} name={"categoria"} />
          <Input
            name={"lugar"}
            clase={"input"}
            type={"text"}
            label={"Lugar:"}
            autocomplete={"off"}
          />
          <InputTextArea
            label={"Descripción:"}
            clase={"text-area"}
            maxChars={"150"}
            name={"texto"}
          />
        </div>
        <div className="div-fotos">
          <InputMultiFotos label={"Fotos Del Viaje"} name={"foto"} initialValue={initialValue.foto} />
        </div>
      </Forms>
      <Toast  toastData={toastData}/>
    </main>
  );
}
