import React, { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import Swal from "sweetalert2";

const initialState = {
  mail: "",
  mailCpf: "",
};
export const TableMail = ({ ...cpf }) => {
  const [state, setState] = useState(initialState);

  const { mail, mailCpf } = state;

  const cpfMail = cpf;

  const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("Mail_client")) ?? [];

  const setLocalStorage = (Mail_client) =>
    localStorage.setItem("Mail_client", JSON.stringify(Mail_client));

  const saveState = () => {
    state.mailCpf = cpfMail;
    if (!state.mailCpf.cpf) {
      Alert("cpf_null");
    } else {
      insertMail();
    }
  };

  const insertMail = () => {
    const Mail_client = getLocalStorage();
    Mail_client.push(state);
    setLocalStorage(Mail_client);
    Alert("insert");
  };

  const db = getLocalStorage();

  const deleteMail = (index) => {
    const Mail_client = getLocalStorage();
    Mail_client.splice(index, 1);
    localStorage.removeItem(Mail_client);
    setLocalStorage(Mail_client);
    Alert("delete");
  };

  const Alert = (action) => {
    if (action === "insert") {
      Swal.fire({
        icon: "success",
        title: "E-mail inserido com sucesso!",
        timer: 1500,
      });
    } else if (action === "delete") {
      Swal.fire({
        icon: "success",
        title: "E-mail deletado!",
        timer: 1500,
      });
    } else if (action === "cpf_null") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        title: "Insira o CPF para adicionar e-mail opcional!",
        timer: 1500,
      });
    }
    clearState();
  };

  const clearState = () => {
    setState({ mail: "" });
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>E-mail</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ReactInputMask
                  id="inputTel"
                  className="form-control"
                  type="email"
                  autoComplete="true"
                  value={mail}
                  onChange={(e) => setState({ ...state, mail: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="button"
                  className="btn btn-success"
                  value="Inserir"
                  onClick={saveState}
                />
              </td>
            </tr>
            {db.map((DataMail, index) => {
              console.log(DataMail);
              if (DataMail.mailCpf.cpf === cpfMail.cpf) {
                return (
                  <tr id={index} key={index}>
                    <td>{DataMail.mail}</td>
                    <td>
                      <input
                        type="button"
                        className="btn btn-danger"
                        value="Excluir"
                        onClick={() => deleteMail(index)}
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableMail;
