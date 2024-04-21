import React, { useState } from "react";
import Usuario from "../../scripts/usuarios";

function AddUserModal({ onClose }) {
    const [userData, setUserData] = useState({
        nomeUsuario: "",
        nomeCompleto: "",
        senha: "",
        email: "",
        tipoUsuario: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(userData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(userData)
            let result = await Usuario.addUser(userData);
            if (result.code === 200) {
                onClose(true);
            } else {
                onclose(false);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="absolute top-32 bg-white rounded shadow-lg w-1/2">
            <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Adicionar Novo Usuário</h2>
                    <button className="text-black close-modal" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <label htmlFor="nomeCompleto" className="block text-gray-700 text-sm font-bold mb-2">
                            Nome Completo:
                        </label>
                        <input
                            type="text"
                            id="nomeCompleto"
                            name="nomeCompleto"
                            value={userData.nomeCompleto}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nomeUsuario" className="block text-gray-700 text-sm font-bold mb-2">
                            Nome de Usuário:
                        </label>
                        <input
                            type="text"
                            id="nomeUsuario"
                            name="nomeUsuario"
                            value={userData.nomeUsuario}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="senha" className="block text-gray-700 text-sm font-bold mb-2">
                            Senha:
                        </label>
                        <input
                            type="text"
                            id="senha"
                            name="senha"
                            value={userData.senha}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tipoUsuario" className="block text-gray-700 text-sm font-bold mb-2">
                            Cargo:
                        </label>
                        <select
                            id="tipoUsuario"
                            name="tipoUsuario"
                            value={userData.tipoUsuario}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        >
                            <option value="">Selecione um cargo</option>
                            <option value='atendente'>Atendente</option>
                            <option value='clinico'>Clínico</option>
                            <option value='administrador'>Administrador</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <button disabled={!userData.tipoUsuario} type="submit" className="btn btn-outline btn-success">
                            Salvar
                        </button>
                        <button type="button" onClick={onClose} className="btn btn-outline btn-error">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUserModal;
