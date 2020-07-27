import React, { useState, useEffect } from "react";
import moment from "moment";
import APIClient from "./api";
import Modal from "./Modal";
import "./App.css";

const App = () => {
  const [nonWorking, setNonWorking] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const loadedDays = localStorage.getItem("loadedDays");

    if (!Boolean(loadedDays)) {
      loadFromURL();
    } else {
      loadFromAPI();
    }
  }, []);

  const loadFromURL = async () => {
    const response = await APIClient.loadDays();
    const { data } = response;

    handleCreate(data);
    localStorage.setItem("loadedDays", "true");
  };

  const loadFromAPI = async () => {
    const response = await APIClient.request("get", "non-working-days");
    const { data } = response;

    setNonWorking(data);
  };

  const openModal = (e, id, dia) => {
    e.preventDefault();
    const day = nonWorking.filter((row) => row.id === id && row.dia === dia);

    setSelectedRow(day[0]);
    setShowModal(true);
  };

  const handleCreate = async (data) => {
    await APIClient.request("post", "non-working-days", data);
    loadFromAPI();
  };

  const handleEdit = async (day) => {
    await APIClient.request("put", "non-working-days", {
      _id: day._id,
      data: day,
    });

    setShowModal(false);
    loadFromAPI();
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Motivo</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {nonWorking.map(({ id, motivo, dia, mes, tipo }) => {
            const year = moment().year();
            return (
              <tr key={`${id}${dia}`}>
                <td>{motivo}</td>
                <td>{moment(`${mes}/${dia}/${year}`).format("DD/MM/YYYY")}</td>
                <td>{tipo}</td>
                <td className="options">
                  <a href="#" onClick={(e) => openModal(e, id, dia)}>
                    Modificar
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          handleEdit={handleEdit}
          day={selectedRow}
        />
      )}
    </div>
  );
};

export default App;
