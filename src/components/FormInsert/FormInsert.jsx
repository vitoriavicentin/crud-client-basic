import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";
import "./FormInsert.css";
import { BsTelephonePlus } from "react-icons/bs";
import { RiMailAddFill } from "react-icons/ri";
import { TablePhones } from "../TablePhones/TablePhones";
import { TableMail } from "../TableMail/TableMail";

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

export const FormInsert = () => {
  const [state, setState] = useState(initialState);
  const [optionalPhone, setOptionalPhone] = useState(false);
  const [optionalMail, setOptionalMail] = useState(false);

  const {
    name,
    cpf,
    cep,
    complement,
    public_place,
    district,
    city,
    uf,
    phone,
    phone_type,
    mail,
  } = state;

  const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("db_client")) ?? [];

  const setLocalStorage = (db_client) =>
    localStorage.setItem("db_client", JSON.stringify(db_client));

  const AddStorage = () => {
    const db_client = getLocalStorage();
    db_client.push(state);
    setLocalStorage(db_client);
    Alert();
  };

  const Alert = () => {
    Swal.fire({
      icon: "success",
      title: "Usuario inserido com sucesso!",
      timer: 1500,
    });
  };

  const getCep = async (abortController = new AbortController()) => {
    return await fetch(`https://viacep.com.br/ws/${state.cep}/json/`)
      .then((res) => res.json())
      .then((result) => {
        setState({
          ...state,
          city: result.localidade,
          public_place: result.logradouro,
          district: result.bairro,
          uf: result.uf,
        });
      })
      .catch((error) => abortController);
  };

  useEffect(() => {
    if (state.cep != null) {
      getCep();
    }
  }, [state.cep]);

  return (
    <form id="FormInsert" onSubmit={AddStorage}>
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
            required
            value={name}
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
            value={cpf}
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
            value={cep}
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
            value={complement}
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
            value={public_place}
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
            value={district}
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
            value={city}
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
            value={uf}
            onChange={(e) => setState({ ...state, uf: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="inputTel" className="col-sm-2 col-form-label">
          Telefone:
        </label>
        <div className="col">
          <InputMask
            id="inputTel"
            className="form-control"
            type="tel"
            mask="(99)9999-99999"
            required
            value={phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <label className="col-sm-2 col-form-label" htmlFor="selectTel">
          Tipo de Telefone:
        </label>
        <div className="col">
          <select
            className="form-select"
            required
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
        <div className="col">
          <button
            className="btn btn-success"
            onClick={() =>
              optionalPhone ? setOptionalPhone(false) : setOptionalPhone(true)
            }
          >
            <BsTelephonePlus />
          </button>
        </div>
      </div>
      <div className="row">
        {optionalPhone && <TablePhones cpf={state.cpf} />}
      </div>
      <div className="row">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">
          Email Principal:
        </label>
        <div className="col">
          <InputMask
            id="inputName"
            className="form-control"
            type="mail"
            maxLength={250}
            minLength={10}
            required
            value={mail}
            onChange={(e) => setState({ ...state, mail: e.target.value })}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-success"
            onClick={() =>
              optionalMail ? setOptionalMail(false) : setOptionalMail(true)
            }
          >
            <RiMailAddFill />
          </button>
        </div>
        <div className="row">
          {optionalMail && <TableMail cpf={state.cpf} />}
        </div>
        <div className="center">
          <input type="submit" className="btn btn-success" value="Inserir" />
        </div>
      </div>
    </form>
  );
};

export default FormInsert;
