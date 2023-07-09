import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const {setUser} = useContext(UserContext)

  const userLogin = async (ev)=>{
    ev.preventDefault();

    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);
      Swal.fire({
        title: 'Inicio de Sesión Correcto',
        icon: 'success',
      }).then(() => {
        setRedirect(true);
      });
    } catch (error) {
      Swal.fire({
        title: 'Inicio de Sesión Fallido',
        icon: 'error',
      });
    }
  }

  if(redirect){
    return <Navigate to="/" />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Inicio de sesión</h1>
        <form className="max-w-md mx-auto" onSubmit={userLogin}>
          <input
            type="email"
            placeholder="Correo Electronico"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          <button className="primary">Inicio de sesión </button>
          <div className="text-center py-2 text-gray-500">
            ¿No tienes una cuenta? {""}
            <Link to={"/register"} className="underline text-black">
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
