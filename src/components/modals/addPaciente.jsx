import React, { useState } from 'react';

export default function AddPatientModal({ onClose }) {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        sexo: '',
        cpf: '',
        telefone: '',
        email: '',
        dataNascimento: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="absolute top-32 bg-white rounded shadow-lg w-1/2">
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Adicionar Paciente</h3>
                    <button className="text-black close-modal" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <label htmlFor="nomeCompleto" className="block text-gray-700 text-sm font-bold mb-2">Nome Completo</label>
                        <input aria-autocomplete='none' autoComplete='off' type="text" name="nomeCompleto" id="nomeCompleto" onChange={handleChange} value={formData.nomeCompleto} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="sexo" className="block text-gray-700 text-sm font-bold mb-2">Sexo</label>
                        <select name="sexo" id="sexo" onChange={handleChange} value={formData.sexo} required className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cpf" className="block text-gray-700 text-sm font-bold mb-2">CPF</label>
                        <input type="text" name="cpf" id="cpf" onChange={handleChange} value={formData.cpf} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="telefone" className="block text-gray-700 text-sm font-bold mb-2">Telefone</label>
                        <input type="tel" name="telefone" id="telefone" onChange={handleChange} value={formData.telefone} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email (Opcional)</label>
                        <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dataNascimento" className="block text-gray-700 text-sm font-bold mb-2">Data de Nascimento</label>
                        <input type="date" name="dataNascimento" id="dataNascimento" onChange={handleChange} value={formData.dataNascimento} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Salvar
                        </button>
                        <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}