// components/Modal.js
import React, { useState } from "react";
import Modal from "react-modal";

const UserInfoModal = ({ isOpen, onRequestClose, onSave }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [email, setEmail] = useState("");
  const [division, setDivision] = useState("");

  const handleSave = () => {
    const userInfo = {
      name,
      mobile,
      email,
      address,
      area,
      division,

    };

    onSave(userInfo);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Information Modal"
      className="fixed inset-0 overflow-y-auto flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black opacity-50"
    >
      <div className="p-4 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Enter Your Information</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </label>
        <label className="block mb-2">
          Mobile:
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="input"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </label>
        <label className="block mb-2">
          Address: City || Area ||
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input"
          />
        </label>
        <label className="block mb-2">
          Division:
          <input
            type="text"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="input"
          />
        </label>
        <label className="block mb-2">
          Area:
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="input"
          />
        </label>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default UserInfoModal;
