import React, { useState } from 'react';
import Pacientes from '../../scripts/pacientes';
import Usuarios from '../../scripts/usuarios';

import GenericSearchModal from "./genericSearchModal";

const getAllPacientes = async () => {
    try {
        return await Pacientes.getAllPacientes();
    } catch (error) {
        console.error('Erro:', error);
    }
};

const getAllClinicos = async () => {
    try {
        return await Usuarios.getUsersByType('clinico');
    } catch (error) {
        console.error('Erro:', error);
    }
};

export default function AddConsultationModal({ onClose }) {
    const [isPacienteSearchOpen, setIsPacienteSearchOpen] = useState(false);
    const [isClinicoOpen, setIsClinicoOpen] = useState(false);
    const [pacientesData, setPacientesData] = useState(null);
    const [clinicoData, setClinicoData] = useState(null);
    const [formData, setFormData] = useState({
        paciente: '',
        clinico: '',
        cpf: '',
        convenio: '',
        telefone: '',
        endereco: '',
        email: '',
        dataNascimento: '',
        sexo: '',
    });

    const openPacienteSearchModal = async () =>{
        const pacientes = await getAllPacientes();
        setPacientesData(pacientes);
        setIsPacienteSearchOpen(true);
    }

    const openClinicoSearchModal = async () => {
        const clinicos = await getAllClinicos();
        setClinicoData(clinicos);
        setIsClinicoOpen(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await Pacientes.addPaciente(formData);
            if (result.code === 200) {
                onClose(true);
            } else {
                onClose(false);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleSelectPaciente = (paciente) => {
        setFormData({ ...formData, paciente: paciente.nomeCompleto });
        setIsPacienteSearchOpen(false);
    };

    const handleSelectClinico = (clinico) => {
        setFormData({ ...formData, clinico: clinico.nomeCompleto });
        setIsClinicoOpen(false);
    };

    const pacientesColumns = [
        { key: "nomeCompleto", title: "Nome" },
        { key: "cpf", title: "CPF" },
        { key: "telefone", title: "Telefone" },
    ];

    const clinicoColumns = [
        { key: "nomeCompleto", title: "Nome" },
    ];

    return (
        <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                <div className="absolute top-32 bg-white rounded shadow-lg w-1/2">
                    <div className="border-b px-4 py-2 flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Adicionar Atendimento</h3>
                        <button className="text-black close-modal" onClick={() => onClose(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="mb-4">
                            <label htmlFor="paciente" className="block text-gray-700 text-sm font-bold mb-2">Paciente</label>
                            <div className="join w-full">
                                <input
                                    type="text"
                                    name="paciente"
                                    id="paciente"
                                    onChange={handleChange}
                                    value={formData.paciente}
                                    placeholder="Selecione o Paciente"
                                    require
                                    className="input input-bordered join-item"
                                    readOnly
                                />
                                <button 
                                    type="button"
                                    onClick={openPacienteSearchModal} 
                                    className="btn btn-outline btn-success join-item"
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="clinico" className="block text-gray-700 text-sm font-bold mb-2">Clínico</label>
                            <div className="join w-full">
                                <input
                                    type="text"
                                    name="clinico"
                                    id="clinico"
                                    onChange={handleChange}
                                    value={formData.clinico}
                                    placeholder="Selecione o Clinico"
                                    require
                                    className="input input-bordered join-item"
                                    readOnly
                                />
                                <button 
                                    type="button"
                                    onClick={openClinicoSearchModal} 
                                    className="btn btn-outline btn-success join-item"
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dataNascimento" className="block text-gray-700 text-sm font-bold mb-2">Data início da consulta</label>
                            <input type="date" name="dataNascimento" id="dataNascimento" onChange={handleChange} value={formData.dataNascimento} className="input input-bordered w-full max-w-xs"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dataNascimento" className="block text-gray-700 text-sm font-bold mb-2">Início</label>
                            <input type="time" id="initTime" class="input input-bordered w-full max-w-xs" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dataNascimento" className="block text-gray-700 text-sm font-bold mb-2">Fim</label>
                            <input type="time" id="finalTime" class="input input-bordered w-full max-w-xs" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dataNascimento" className="block text-gray-700 text-sm font-bold mb-2">Tipo de consulta</label>
                            <select className="select select-bordered w-full max-w-xs">
                                <option value=''>Selecione um tipo</option>
                                <option>Orçamento</option>
                                <option>Sem custo</option>
                                <option>Retorno</option>
                                <option>Custo não calculado</option>
                                <option>Custo pré-fixado</option>
                                <option>Atendimento mensal</option>
                            </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <button type="submit" className="btn btn-outline btn-success">
                                Salvar
                            </button>
                            <button type="button" onClick={onClose} className="btn btn-outline btn-error">
                                Cancelar
                            </button>
                        </div>
                    </form>
                    <GenericSearchModal
                        isOpen={isPacienteSearchOpen}
                        title="Pesquisar Paciente"
                        data={pacientesData || []}
                        columns={pacientesColumns}
                        onSelectItem={handleSelectPaciente}
                        onClose={() => setIsPacienteSearchOpen(false)}
                    />
                    <GenericSearchModal
                        isOpen={isClinicoOpen}
                        title="Pesquisar Clínico"
                        data={clinicoData || []}
                        columns={clinicoColumns}
                        onSelectItem={handleSelectClinico}
                        onClose={() => setIsClinicoOpen(false)}
                    />
                </div>
            </div>
        </>
    );
}