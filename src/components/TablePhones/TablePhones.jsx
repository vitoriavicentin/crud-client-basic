import React, { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import Swal from "sweetalert2";

const initialState = {
  phone: "",
  phone_type: "",
  phoneCpf: "",
};
export const TablePhones = ({ ...cpf }) => {
  const [state, setState] = useState(initialState);

  const { phone, phone_type, phoneCpf } = state;

  const cpfPhone = cpf;

  const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("phones_client")) ?? [];

  const setLocalStorage = (phones_client) =>
    localStorage.setItem("phones_client", JSON.stringify(phones_client));

  const saveState = () => {
    state.phoneCpf = cpfPhone;
    insertPhone();
  };

  const insertPhone = () => {
    const phones_client = getLocalStorage();
    phones_client.push(state);
    setLocalStorage(phones_client);
    Alert("insert");
  };

  const db = getLocalStorage();

  const deletePhone = (index) => {
    const phones_client = getLocalStorage();
    phones_client.splice(index, 1);
    localStorage.removeItem(phones_client);
    setLocalStorage(phones_client);
    Alert("delete");
  };

  const Alert = (action) => {
    if (action === "insert") {
      Swal.fire({
        icon: "success",
        title: "Telefone inserido com sucesso!",
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Telefone deletado!",
        timer: 1500,
      });
    }
    clearState();
  };

  const clearState = () => {
    setState({ state: "" });
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Telefone</th>
              <th>Tipo de Telefone</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ReactInputMask
                  id="inputTel"
                  className="form-control"
                  type="tel"
                  mask="(99)9999-99999"
                  value={phone}
                  onChange={(e) =>
                    setState({ ...state, phone: e.target.value })
                  }
                />
              </td>
              <td>
                <select
                  className="form-select"
                  onChange={(e) =>
                    setState({ ...state, phone_type: e.target.value })
                  }
                >
                  <option selected value="Residencial">
                    Selecione
                  </option>
                  <option value="Residencial">Residencial</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Celular">Celular</option>
                </select>
              </td>
              <td>
                <td>
                  <input
                    type="button"
                    className="btn btn-success"
                    value="Inserir"
                    onClick={saveState}
                  />
                </td>
              </td>
            </tr>
            {db.map((DataPhone, index) => {
              if (DataPhone.phoneCpf.cpf === cpfPhone.cpf) {
                return (
                  <tr id={index} key={index}>
                    <td>{DataPhone.phone}</td>
                    <td>{DataPhone.phone_type}</td>
                    <td>
                      <td>
                        <input
                          type="button"
                          className="btn btn-danger"
                          value="Excluir"
                          onClick={() => deletePhone(index)}
                        />
                      </td>
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

export default TablePhones;
