import React, { useState } from 'react';

export default function AddAppointmentModal({ onClose }) {
    const [formData, setFormData] = useState({
        dataConsulta: '',
        horaConsulta: '',
        paciente: '',
        descricao: '',
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
        console.log(formData); // Aqui você substitui pelo método de enviar os dados para o seu backend
        onClose(); // Fechar o modal após o envio do formulário
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="absolute top-32 bg-white rounded shadow-lg w-1/2">
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Adicionar Consulta</h3>
                    <button className="text-black" onClick={onClose}>
                        {/* Ícone de fechar */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <label htmlFor="dataConsulta" className="block text-gray-700 text-sm font-bold mb-2">Data da Consulta</label>
                        <input type="date" name="dataConsulta" id="dataConsulta" onChange={handleChange} value={formData.dataConsulta} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="horaConsulta" className="block text-gray-700 text-sm font-bold mb-2">Hora da Consulta</label>
                        <input type="time" name="horaConsulta" id="horaConsulta" onChange={handleChange} value={formData.horaConsulta} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="paciente" className="block text-gray-700 text-sm font-bold mb-2">Paciente</label>
                        <input type="text" name="paciente" id="paciente" onChange={handleChange} value={formData.paciente} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="descricao" className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
                        <textarea name="descricao" id="descricao" rows="4" onChange={handleChange} value={formData.descricao} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
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
