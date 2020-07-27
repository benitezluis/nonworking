import React, { useState } from "react";
import Modal from "react-modal";
import { Input } from "./components";

const ModalEdit = ({ setShowModal, handleEdit, day }) => {
  const [editDay, setEditDay] = useState(day);

  const write = (field, value) => {
    setEditDay({ ...editDay, [field]: value });
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => setShowModal(false)}
      ariaHideApp={false}
    >
      <h2>Editar día</h2>

      <div className="form">
        <div className="form-left">
          <Input title="Motivo" value={editDay.motivo} onChange={write} />
          <Input
            title="Mes"
            value={editDay.mes}
            onChange={write}
            type="number"
            max="12"
            min="1"
          />
          <Input
            title="Dia"
            value={editDay.dia}
            onChange={write}
            type="number"
            max="31"
            min="1"
          />
        </div>
        <div className="form-right">
          <Input title="Id" value={editDay.id} onChange={write} />
          <Input title="Tipo" value={editDay.tipo} onChange={write} />
          <Input title="Info" value={editDay.info} onChange={write} />
        </div>
      </div>

      <div className="buttons">
        <button className="cancel" onClick={() => setShowModal(false)}>
          Cerrar
        </button>
        <button className="button-success" onClick={() => handleEdit(editDay)}>
          Guardar
        </button>
      </div>
    </Modal>
  );
};

export default ModalEdit;
