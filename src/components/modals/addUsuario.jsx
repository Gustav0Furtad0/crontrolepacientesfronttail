import React, { useState } from "react";

function AddUserModal({ onClose }) {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        role: "Usuário", // Valor padrão
        status: "Ativo", // Valor padrão
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados do usuário para adicionar:", userData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-5">
                <h2 className="text-lg font-semibold">
                    Adicionar Novo Usuário
                </h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className="block mt-2">
                        Nome de Usuário:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                        className="mt-1 mb-4 p-2 w-full border rounded"
                    />

                    <label htmlFor="email" className="block">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 mb-4 p-2 w-full border rounded"
                    />

                    <label htmlFor="role" className="block">
                        Papel:
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={userData.role}
                        onChange={handleChange}
                        className="mt-1 mb-4 p-2 w-full border rounded"
                    >
                        <option>Usuário</option>
                        <option>Administrador</option>
                    </select>

                    <label htmlFor="status" className="block">
                        Status:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={userData.status}
                        onChange={handleChange}
                        className="mt-1 mb-4 p-2 w-full border rounded"
                    >
                        <option>Ativo</option>
                        <option>Inativo</option>
                    </select>

                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUserModal;
