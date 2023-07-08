import { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";
import {Navigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductPage from "./ProductPage";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");

    setRedirect("/");
    setUser(null);
  };

  if (!ready) {
    return "Cargando";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <button onClick={logout} className="primary max-w-sm mt-2">
            Cerrar Session
          </button>
        </div>
      )}
      {subpage === "product" && <ProductPage />}
    </div>
  );
};

export default ProfilePage;
