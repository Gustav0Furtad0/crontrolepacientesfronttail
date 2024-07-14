import React, { useState, useEffect } from "react";
import Pacientes from "../../scripts/pacientes";
import Usuarios from "../../scripts/usuarios";
import Consulta from "../../scripts/consultas";
import GenericSearchModal from "./genericSearchModal";
import { useAlert } from '../providers/alertContext';

const getAllPacientes = async () => {
    try {
        return await Pacientes.getAllPacientes();
    } catch (error) {
        console.error("Erro:", error);
    }
};

const getAllClinicos = async () => {
    try {
        return await Usuarios.getUsersByType("clinico");
    } catch (error) {
        console.error("Erro:", error);
    }
};

export default function AddConsultationModal({ onClose }) {
    const [isPacienteSearchOpen, setIsPacienteSearchOpen] = useState(false);
    const [isClinicoOpen, setIsClinicoOpen] = useState(false);
    const [pacientesData, setPacientesData] = useState(null);
    const [clinicoData, setClinicoData] = useState(null);
    const [formData, setFormData] = useState({
        pacienteId: "",
        pacienteNome: "",
        clinicoId: "",
        clinicoNome: "",
        dataConsulta: "",
        horaInicio: "",
        horaFinal: "",
        tipoConsulta: "",
        descricao: "",
    });
    const showAlert = useAlert();

    const openPacienteSearchModal = async () => {
        const pacientes = await getAllPacientes();
        setPacientesData(pacientes);
        setIsPacienteSearchOpen(true);
    };

    const openClinicoSearchModal = async () => {
        const clinicos = await getAllClinicos();
        setClinicoData(clinicos);
        setIsClinicoOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevState) => {
            const newFormData = { ...prevState, [name]: value };
            return newFormData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Form data:", formData);
            if (formData.horaInicio >= formData.horaFinal) {
                showAlert('Horário de início deve ser menor que o horário final', 'error', '#EF4444', 5000);
                return;
            }
            let result = await Consulta.addConsulta({
                pacienteId: formData.pacienteId,
                clinicoId: formData.clinicoId,
                dataConsulta: formData.dataConsulta,
                horaInicio: formData.horaInicio,
                horaFinal: formData.horaFinal,
                tipoConsulta: formData.tipoConsulta,
                descricao: formData.descricao,
            });
    
            if (result.code === 201) {
                onClose(true);
            } else {
                onClose(false);
            }
        } catch (error) {
            console.error("Erro:", error);
            onClose(false);
        }
    };

    const handleSelectPaciente = (paciente) => {
        setFormData({
            ...formData,
            pacienteId: paciente.id,
            pacienteNome: paciente.nomeCompleto,
        });
        setIsPacienteSearchOpen(false);
    };

    const handleSelectClinico = (clinico) => {
        setFormData({
            ...formData,
            clinicoId: clinico.uid,
            clinicoNome: clinico.nomeCompleto,
        });
        setIsClinicoOpen(false);
    };

    const pacientesColumns = [
        { key: "nomeCompleto", title: "Nome" },
        { key: "cpf", title: "CPF" },
        { key: "telefone", title: "Telefone" },
    ];

    const clinicoColumns = [{ key: "nomeCompleto", title: "Nome" }];

    const verificarData = () => {
        if (formData.clinicoId && formData.dataConsulta && formData.horaInicio && formData.horaFinal) {
            let queryParams = {
                clinicoId: formData.clinicoId,
                data: formData.dataConsulta,
                horaInicio: formData.horaInicio,
                horaFinal: formData.horaFinal,
            };
            Consulta.verificarDisponibilidadeConsulta(queryParams).then((result) => {
                console.log("Resultado:", result);
                if (result.code === 200) {
                    showAlert('Horário disponível', 'success', '#14B8A6', '5000');
                    document.getElementById('btnSalvar').classList.remove('btn-disabled');
                    document.getElementById('btnSalvar').setAttribute('aria-disabled', 'false');
                    document.getElementById('btnSalvar').parentNode.setAttribute('data-tip', 'Marcar atendimento');
                } else if (result.code === 409) {
                    showAlert('Já existe um atendimento neste horário', 'error', '#EF4444', 5000);
                    document.getElementById('btnSalvar').classList.add('btn-disabled');
                    document.getElementById('btnSalvar').setAttribute('aria-disabled', 'true');
                    document.getElementById('btnSalvar').parentNode.setAttribute('data-tip', 'Horário indisponível');
                } else if (result.code === 500) {
                    showAlert( 'Erro ao verificar disponibilidade', 'error', '#EF4444', 5000 );
                    document.getElementById('btnSalvar').classList.add('btn-disabled');
                    document.getElementById('btnSalvar').setAttribute('aria-disabled', 'true');
                    document.getElementById('btnSalvar').parentNode.setAttribute('data-tip', 'Erro ao verificar disponibilidade');
                }
            }).catch((error) => {
                console.error("Erro:", error);
                showAlert('Erro ao verificar disponibilidade', 'error', '#EF4444', 5000 );
                document.getElementById('btnSalvar').classList.add('btn-disabled');
                document.getElementById('btnSalvar').setAttribute('aria-disabled', 'true');
                document.getElementById('btnSalvar').parentNode.setAttribute('data-tip', 'Erro ao verificar disponibilidade');  
            });
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            verificarData(formData);
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [formData.dataConsulta, formData.horaInicio, formData.horaFinal, formData.clinicoId]);

    return (
        <>
            <dialog className="my-modal">
                <div className="modal-box w-11/12 max-w-5xl"
                    style={{ transform: "none"}}
                >
                    <div className="border-b px-4 py-2 flex justify-between items-center">
                        <h3 className="font-semibold text-lg">
                            Adicionar Atendimento
                        </h3>
                        <button
                            className="text-black close-modal"
                            onClick={() => onClose(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="mb-4">
                            <label
                                htmlFor="pacienteNome"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Paciente
                            </label>
                            <div className="join w-full">
                                <input
                                    type="text"
                                    name="pacienteNome"
                                    id="pacienteNome"
                                    onChange={handleChange}
                                    value={formData.pacienteNome}
                                    placeholder="Selecione o Paciente"
                                    required
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
                            <label
                                htmlFor="clinicoNome"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Clínico
                            </label>
                            <div className="join w-full">
                                <input
                                    type="text"
                                    name="clinicoNome"
                                    id="clinicoNome"
                                    onChange={handleChange}
                                    value={formData.clinicoNome}
                                    placeholder="Selecione o Clinico"
                                    required
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
                            <label
                                htmlFor="dataConsulta"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Data da consulta
                            </label>
                            <input
                                type="date"
                                name="dataConsulta"
                                id="dataConsulta"
                                onChange={handleChange}
                                value={formData.dataConsulta}
                                className="input input-bordered w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="horaInicio"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Início
                            </label>
                            <input
                                type="time"
                                name="horaInicio"
                                id="horaInicio"
                                onChange={handleChange}
                                value={formData.horaInicio}
                                className="input input-bordered w-full max-w-xs"
                                max={formData.horaFinal || '23:59'}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="horaFinal"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Fim
                            </label>
                            <input
                                type="time"
                                name="horaFinal"
                                id="horaFinal"
                                onChange={handleChange}
                                value={formData.horaFinal}
                                className="input input-bordered w-full max-w-xs"
                                min={formData.horaInicio || '00:00'}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="tipoConsulta"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Tipo de consulta
                            </label>
                            <select
                                name="tipoConsulta"
                                id="tipoConsulta"
                                onChange={handleChange}
                                value={formData.tipoConsulta}
                                className="select select-bordered w-full max-w-xs"
                                required
                            >
                                <option value="">Selecione um tipo</option>
                                <option value="orcamento">Orçamento</option>
                                <option value="gratuito">Sem custo</option>
                                <option value="retorno">Retorno</option>
                                <option value="indefinido">
                                    Custo não calculado
                                </option>
                                <option value="fixo">Custo pré-fixado</option>
                                <option value="mensal">
                                    Atendimento mensal
                                </option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="descricao"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Descrição
                            </label>
                            <textarea
                                name="descricao"
                                id="descricao"
                                onChange={handleChange}
                                value={formData.descricao}
                                placeholder="Descrição do atendimento"
                                className="textarea textarea-bordered w-full"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="tooltip" data-tip="Marcar atendimento">
                                <button
                                    id="btnSalvar"
                                    type="submit"
                                    className="btn btn-outline btn-success btn-disabled"
                                    aria-disabled="true"
                                >
                                    Salvar
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={() => onClose(false)}
                                className="btn btn-outline btn-error"
                            >
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
            </dialog>
        </>
    );
}
