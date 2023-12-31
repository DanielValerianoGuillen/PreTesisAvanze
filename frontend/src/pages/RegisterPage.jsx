import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      Swal.fire('Registro exitoso', '', 'success');
    } catch (error) {
      Swal.fire('Registro fallido', 'Correo ya existente', 'error');
    }
    
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Registro</h1>
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <button className="primary">Crear Cuenta</button>
          <div className="text-center py-2 text-gray-500">
            ¿Ya tienes cuenta? {""}
            <Link to={"/login"} className="underline text-black">
              Inicio de sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
