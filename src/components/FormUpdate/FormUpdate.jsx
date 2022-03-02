import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";

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
};

export const FormUpdate = ({ ...newData }) => {
  const [state, setState] = useState(initialState);

  const newdataClient = newData.newData;

  const index = newData.indexCli;

  const readClient = () => JSON.parse(localStorage.getItem("db_client")) ?? [];

  const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("db_client")) ?? [];

  const setLocalStorage = (db_client) =>
    localStorage.setItem("db_client", JSON.stringify(db_client));

  const updateClient = () => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    localStorage.removeItem(index);
    setLocalStorage(dbClient);
    const db_client = getLocalStorage();
    db_client.push(state);
    setLocalStorage(db_client);
    Alert();
  };

  const Alert = () => {
    Swal.fire({
      icon: "success",
      title: "Usuario atualizado com sucesso!",
      timer: 1500,
    });
  };

  const setnewdataClient = () => {
    setState({
      ...state,
      name: newdataClient.name,
      cpf: newdataClient.cpf,
      cep: newdataClient.cep,
      complement: newdataClient.complement,
      public_place: newdataClient.public_place,
      district: newdataClient.district,
      city: newdataClient.city,
      uf: newdataClient.uf,
      phone: newdataClient.phone,
      phone_type: newdataClient.phone_type,
      mail: newdataClient.mail,
    });
  };

  const setnewStateArray = () => {
    setState({
      ...state,
      name: state.name,
      cpf: state.cpf,
      cep: state.cep,
      complement: state.complement,
      public_place: state.public_place,
      district: state.district,
      city: state.city,
      uf: state.uf,
      phone: state.phone,
      phone_type: state.phone_type,
      mail: state.mail,
    });
  };

  useEffect(() => {
    setnewdataClient();
  }, [newdataClient]);

  useEffect(() => {
    setnewStateArray();
  }, [state.name]);

  return (
    <form id="FormInsert" onSubmit={updateClient}>
      <div className="row">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">
          Nome
        </label>
        <div className="col">
          <InputMask
            id="inputName"
            className="form-control"
            type="text"
            maxLength={100}
            minLength={1}
            required
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </div>
        <label htmlFor="inputCpf" className="col-sm-2 col-form-label">
          CPF
        </label>
        <div className="col">
          <InputMask
            id="inputCpf"
            type="text"
            mask={"999.999.999-99"}
            required
            className="form-control"
            value={state.cpf}
            onChange={(e) => setState({ ...state, cpf: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="inputCep" className="col-sm-2 col-form-label">
          CEP
        </label>
        <div className="col">
          <InputMask
            id="inputCep"
            className="form-control"
            type="text"
            mask="99999-999"
            required
            value={state.cep}
            onChange={(e) => setState({ ...state, cep: e.target.value })}
          />
        </div>
        <label htmlFor="inputComplement" className="col-sm-2 col-form-label">
          Complemento
        </label>
        <div className="col">
          <InputMask
            id="inputComplement"
            className="form-control"
            type="text"
            value={state.complement}
            onChange={(e) => setState({ ...state, complement: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="inputLogradouro" className="col-sm-2 col-form-label">
          Logradouro
        </label>
        <div className="col">
          <InputMask
            id="inputLogradouro"
            className="form-control"
            type="text"
            maxLength={250}
            required
            value={state.public_place}
            onChange={(e) =>
              setState({ ...state, public_place: e.target.value })
            }
          />
        </div>
        <label htmlFor="InputBairro" className="col-sm-2 col-form-label">
          Bairro
        </label>
        <div className="col">
          <InputMask
            id="InputBairro"
            className="form-control"
            type="text"
            maxLength={250}
            required
            value={state.district}
            onChange={(e) => setState({ ...state, district: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="inputCity" className="col-sm-2 col-form-label">
          Cidade
        </label>
        <div className="col">
          <InputMask
            id="inputCity"
            className="form-control"
            type="text"
            maxLength={250}
            required
            value={state.city}
            onChange={(e) => setState({ ...state, city: e.target.value })}
          />
        </div>
        <label htmlFor="inputUf" className="col-sm-2 col-form-label">
          UF
        </label>
        <div className="col">
          <InputMask
            id="inputUf"
            className="form-control"
            type="text"
            maxLength={2}
            required
            value={state.uf}
            onChange={(e) => setState({ ...state, uf: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="inputTel" className="col-sm-2 col-form-label">
          Telefone
        </label>
        <div className="col">
          <InputMask
            id="inputTel"
            className="form-control"
            type="tel"
            mask="(99)9999-99999"
            required
            value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
          />
        </div>
        <label className="col-sm-2 col-form-label" htmlFor="selectTel">
          Tipo:
        </label>
        <div className="col">
          <select
            className="form-select"
            onChange={(e) => setState({ ...state, phone_type: e.target.value })}
          >
            <option selected value="Residencial">
              Selecione
            </option>
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
            <option value="Celular">Celular</option>
          </select>
        </div>
      </div>
      <div className="row">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col">
          <InputMask
            id="inputName"
            className="form-control"
            type="mail"
            maxLength={250}
            minLength={10}
            required
            value={state.mail}
            onChange={(e) => setState({ ...state, mail: e.target.value })}
          />
        </div>
        <div className="center">
          <input type="submit" className="btn btn-success" value="Editar" />
        </div>
      </div>
    </form>
  );
};

export default FormUpdate;
