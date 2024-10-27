import React, { useState, useEffect } from "react";
import Pacientes from "../../scripts/pacientes";
import GenericSearchModal from "./genericSearchModal";
import ToggleArea from '../visual/toggleArea';

export default function AddPaymentModal({ onClose }) {
    const now = new Date().toISOString();
    const [isModalPacienteSearch, setisModalPacienteSearch] = useState(false);
    const [isModalServicoSearch, setisModalServicoSearch] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [formData, setFormData] = useState({
        dataPagamento: now.split("T")[0],
        horaPagamento: now.split("T")[1],
        valor: "",
        servico: "",
    });

    // const getAllServicos = async (pacienteId) => {
    //     try {
    //         const queryParams = {
    //             pacienteId,
    //         };
    //         const response = await Consultas.getConsultas(queryParams);
    //         setPacientes(response);
    //     } catch (error) {
    //         console.error("Erro:", error);
    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectPaciente = (paciente) => {
        setFormData({
            ...formData,
            pacienteId: paciente.id,
            pacienteNome: paciente.nomeCompleto,
        });
        setisModalPacienteSearch(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    const openPacienteSearchModal = async () => {
        const pacientes = await Pacientes.getAllPacientes();
        console.log("paciente chamando", pacientes);
        setPacientes(pacientes);
        setisModalPacienteSearch(true);
    };

    const pacientesColumns = [
        { key: "nomeCompleto", title: "Nome" },
        { key: "cpf", title: "CPF" },
        { key: "telefone", title: "Telefone" },
    ];

    return (
        <dialog className="my-modal" open>
            <div className="modal-box w-11/12 max-w-5xl" style={{ transform: "none"}}>
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h3 className="font-semibold text-xl">
                        Adicionar Pagamento
                    </h3>
                    <button className="text-black" onClick={onClose}>
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
                                d="M6 18L18 6M6 6l12 12"
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
                                onChange={handleSelectPaciente}
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
                            htmlFor="pacienteServico"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Serviços
                        </label>
                        <div className="join w-full">
                            <input
                                type="text"
                                name="pacienteServico"
                                id="pacienteServico"
                                onChange={handleChange}
                                value={formData.pacienteServico}
                                placeholder="Selecione o Serviço"
                                required
                                className="input input-bordered join-item"
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={() => setisModalServicoSearch(true)}
                                className="btn btn-outline btn-success join-item"
                            >
                                Pesquisar
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="valor"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Valor
                        </label>
                        <input
                            type="number"
                            name="valor"
                            id="valor"
                            onChange={handleChange}
                            value={formData.valor}
                            className="input input-bordered w-full max-w-xs"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <div className="mb-4">
                            <label htmlFor="parcelas" className="block text-gray-700 text-sm font-bold mb-2">Número de parcelas</label>
                            <input type="number" name="parcelas" id="parcelas" onChange={handleChange} value={formData.parcelas} className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dataCobranca" className="block text-gray-700 text-sm font-bold mb-2">Dia de cobrança (primeira cobrança)</label>
                            <input type="date" name="dataCobranca" id="dataCobranca" onChange={handleChange} value={formData.dataCobranca} className="input input-bordered w-full max-w-xs" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="intervaloCobranca" className="block text-gray-700 text-sm font-bold mb-2">Cobrança recorrente das próximas parcelas (mesmo dia do mês)?</label>
                            <input type="checkbox" className="toggle" defaultChecked />
                            <ToggleArea label="Intervalo de pagamentos personalizado" checked={false}>
                                <div className="mb-4">
                                    <label htmlFor="intervaloCobranca" className="block text-gray-700 text-sm font-bold mb-2">Intervalo (em dias corridos)</label>
                                    <input
                                        type="number"
                                        name="intervaloCobranca"
                                        id="intervaloCobranca"
                                        onChange={handleChange}
                                        value={formData.intervaloCobranca}
                                        className="input input-bordered w-full max-w-xs"
                                        required
                                    />
                                </div>
                            </ToggleArea>
                        </div>
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
                {isModalPacienteSearch && (
                    <GenericSearchModal
                        isOpen={isModalPacienteSearch}
                        title="Pesquisar Paciente"
                        data={pacientes}
                        columns={pacientesColumns}
                        onSelectItem={handleSelectPaciente}
                        onClose={() => setisModalPacienteSearch(false)}
                    />
                )}
                {isModalServicoSearch && (
                    <GenericSearchModal
                        isOpen={isModalServicoSearch}
                        title="Pesquisar Serviços"
                        data={pacientes || []}
                        columns={pacientesColumns}
                        onSelectItem={[]}
                        onClose={() => setisModalServicoSearch(false)}
                    />
                )}
            </div>
        </dialog>
    );
}
