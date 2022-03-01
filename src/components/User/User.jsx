import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./User.css";

const initialState = {
  user: "",
  password: "",
};
export const User = () => {
  const [state, setState] = useState(initialState);

  const { user, password } = state;

  const checkLogin = (state) => {
    if (user === "admin" && password === "123456") {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        title: "Usuario autenticado com sucesso",
      });

      window.location.href = "/Form";
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        title: "Erro Usuario Invalido!",
      });
    }
  };
  return (
    <form id="formUser">
      <div id="divUser">
        <input
          id="inputUser"
          type="text"
          name="inputUser"
          value={user}
          required
          onChange={(e) => setState({ ...state, user: e.target.value })}
        />
        <label id="labelUser" htmlFor="inputUser">
          Usuário:
        </label>
      </div>
      <div id="divUser">
        <input
          id="inputUser"
          type="password"
          name="inputUser"
          value={password}
          required
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
        <label id="labelUser" htmlFor="inputUser">
          Senha:
        </label>
      </div>
      <div className="row">
        <input
          type="button"
          id="validationUser"
          value="Login"
          onClick={checkLogin}
        />
      </div>
    </form>
  );
};

export default User;
