import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import FormUpdate from "../FormUpdate/FormUpdate";

const initialState = {
  name: "",
  cpf: "",
  cep: "",
  complement: "",
  public_place: "",
  district: "",
  city: "",
  uf: "",
  phone: "",
  phone_type: "",
  mail: "",
  newData: {},
  modal_id: "",
  indexCli: "",
};

export const TableClient = () => {
  const [state, setState] = useState(initialState);

  const readClient = () => JSON.parse(localStorage.getItem("db_client")) ?? [];

  const db = readClient();

  const setLocalStorage = (db_client) =>
    localStorage.setItem("db_client", JSON.stringify(db_client));

  const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    localStorage.removeItem(index);
    setLocalStorage(dbClient);
    Alert();
  };

  const setClient = (index) => {
    state.newData = readClient()[index];
    state.indexCli = index;
    console.log(state.indexCli);
    setState({ ...state, modal_id: index });
  };

  const Alert = () => {
    Swal.fire({
      icon: "success",
      title: "Usuario deletado!",
      timer: 1500,
    });
    window.location.reload();
  };

  return (
    <>
      <div id="FormInsert" className="c-table">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>CEP</th>
                <th>Complemento</th>
                <th>Logradouro</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>Telefone</th>
                <th>Tipo</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {db.map((dataClient, index) => (
                <tr id={index} key={index}>
                  <td>{dataClient.name}</td>
                  <td>{dataClient.cpf}</td>
                  <td>{dataClient.cep}</td>
                  <td>{dataClient.complement}</td>
                  <td>{dataClient.public_place}</td>
                  <td>{dataClient.district}</td>
                  <td>{dataClient.city}</td>
                  <td>{dataClient.uf}</td>
                  <td>{dataClient.phone}</td>
                  <td>{dataClient.phone_type}</td>
                  <td>{dataClient.mail}</td>
                  <td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => setClient(index)}
                        data-bs-toggle="modal"
                        data-bs-target={"#ModalClient" + state.modal_id}
                      >
                        <AiTwotoneEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteClient(index)}
                      >
                        <AiTwotoneDelete />
                      </button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="modal fade"
        id={"ModalClient" + state.modal_id}
        aria-labelledby="Edição de cadastro"
        aria-hidden="true"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edição de cadastro
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormUpdate newData={state.newData} indexCli={state.indexCli} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableClient;
