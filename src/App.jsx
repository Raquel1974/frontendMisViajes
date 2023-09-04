import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { ModificarUsuario } from "./Pages/ModificarUsuario";
import { RegistroUsuario } from "./Pages/RegistroUsuario";
import { LoginContext, LoginAuth } from "./context/LoginContext.js";
import { ListarEntradas } from "./Pages/ListarEntradas";

function App() {
  const { login, setLogin } = LoginAuth();

  return (
    <>
      <LoginContext.Provider value={{login, setLogin}}>
        <Header />
        <Routes>
          <Route path="/" element={<ListarEntradas />} />
          {/*<Route path="/entradas/:id" element={<ConsultarEntrada />} />
          <Route path="/entradas/modificar" element={<ModificarEntrada />} />
          <Route path="/entradas/crear" element={<CrearEntrada />} />
          <Route path="/login" element={<Login />} />*/}
          <Route path="/registro" element={<RegistroUsuario />} />
          {/*<Route path="/validar-registro" element={<ValidarRegistro />} /> */}
          <Route path="/modificar-usuario" element={<ModificarUsuario />} />
          {/* <Route path="/*" element={<PaginaNoEncontrada />} />  */}
        </Routes>
        {/* <Footer /> */}
      </LoginContext.Provider>
    </>
  );
}

export default App;
