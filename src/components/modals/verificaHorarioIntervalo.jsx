import React, { useState, useEffect } from "react";
import Usuarios from "../../scripts/usuarios";
import Consulta from "../../scripts/consultas";
import GenericSearchModal from "./genericSearchModal";
import SelecionaDiaModal from "./selecionaDiaModal";
import { useAlert } from '../providers/alertContext';

const getAllClinicos = async () => {
    try {
        return await Usuarios.getUsersByType("clinico");
    } catch (error) {
        console.error("Erro:", error);
    }
};

export default function VerificaHorarioIntervalo({ onClose, handleSelectedDia }) {
    const [isClinicoOpen, setIsClinicoOpen] = useState(false);
    const [clinicoData, setClinicoData] = useState(null);
    const [isSelecionaDiaOpen, setIsSelecionaDiaOpen] = useState(false);
    const [diasData, setDiasData] = useState(null);
    const [formData, setFormData] = useState({
        clinicoId: '',
        clinicoNome: '',
        dataInicio: '',
        dataFim: '',
        horaInicio: '',
        horaFinal: '',
        diasSemana: [0, 1, 2, 3, 4],
        duracaoMinutos: 60, // Valor padrão definido aqui
    });
    const showAlert = useAlert();   
    
    const openClinicoSearchModal = async () => {
        const clinicos = await getAllClinicos();
        setClinicoData(clinicos);
        setIsClinicoOpen(true);
    };
    
    const openSelecionaDiaModal = async (dia) => {
        setDiasData(dia);
        setIsSelecionaDiaOpen(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === 'checkbox' && name === 'diasSemana') {
            const dayValue = parseInt(value);
            setFormData((prevState) => {
                const newDiasSemana = checked
                    ? [...prevState.diasSemana, dayValue]
                    : prevState.diasSemana.filter((dia) => dia !== dayValue);

                return { ...prevState, diasSemana: newDiasSemana };
            });
        } else {
            setFormData((prevState) => {
                return { ...prevState, [name]: value };
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Form data:", formData);
            if (formData.horaInicio >= formData.horaFinal) {
                showAlert('Horário de início deve ser menor que o horário final', 'error', '#EF4444', 5000);
                return;
            }
            if (formData.dataInicio >= formData.dataFim) {
                showAlert('Data de início deve ser menor que a data final', 'error', '#EF4444', 5000);
                return;
            }
            let dias = await Consulta.verificarPossiveisHorarios({
                clinicoId: formData.clinicoId,
                dataInicio: formData.dataInicio,
                dataFim: formData.dataFim,
                horaInicio: formData.horaInicio,
                horaFim: formData.horaFinal,
                duracaoMinutos: formData.duracaoMinutos, 
                diasSemana: formData.diasSemana
            });

            openSelecionaDiaModal(dias);

        } catch (error) {
            console.error("Erro:", error);
            onClose(false);
        }
    };

    const handleSelectClinico = (clinico) => {
        setFormData({
            ...formData,
            clinicoId: clinico.uid,
            clinicoNome: clinico.nomeCompleto,
        });
        setIsClinicoOpen(false);
    };

    const handleSelectedDiaModal = (dia) => {
        setIsSelecionaDiaOpen(false);
        if (!dia) {
            return;
        }
        handleSelectedDia(dia);
    };

    const clinicoColumns = [{ key: "nomeCompleto", title: "Nome" }];

    return (
        <>
            <dialog className="my-modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="border-b px-4 py-2 flex justify-between items-center">
                        <h3 className="font-semibold text-lg">
                            Verificar Horário Intervalado
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
                                    className="btn btn-outline btn-theme-principal join-item"
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Dias da Semana
                            </label>
                            <div className="flex flex-wrap">
                                {[
                                    { label: 'Domingo', value: 6 },
                                    { label: 'Segunda', value: 0 },
                                    { label: 'Terça', value: 1 },
                                    { label: 'Quarta', value: 2 },
                                    { label: 'Quinta', value: 3 },
                                    { label: 'Sexta', value: 4 },
                                    { label: 'Sábado', value: 5 },
                                ].map((dia) => (
                                    <label key={dia.value} className="flex items-center mr-4 mb-2">
                                        <input
                                            type="checkbox"
                                            name="diasSemana"
                                            value={dia.value}
                                            onChange={handleChange}
                                            checked={formData.diasSemana.includes(dia.value)}
                                            className="checkbox [--chkbg:theme(colors.teal.500)] border-teal-500 mr-2"
                                        />
                                        {dia.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="dataInicio"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Data Ínicio
                            </label>
                            <input
                                type="date"
                                name="dataInicio"
                                id="dataInicio"
                                onChange={handleChange}
                                value={formData.dataInicio}
                                className="input input-bordered w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="dataFim"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Data da consulta
                            </label>
                            <input
                                type="date"
                                name="dataFim"
                                id="dataFim"
                                onChange={handleChange}
                                value={formData.dataFim}
                                className="input input-bordered w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="horaInicio"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Verificar de
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
                                Verificar até
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
                                htmlFor="duracaoMinutos"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Tempo necessário
                            </label>
                            <select
                                name="duracaoMinutos"
                                id="duracaoMinutos"
                                onChange={handleChange}
                                value={formData.duracaoMinutos}
                                className="input input-bordered w-full max-w-xs"
                                required
                            >
                                <option value="15">15 minutos</option>
                                <option value="30">30 minutos</option>
                                <option value="45">45 minutos</option>
                                <option value="60">1 hora</option>
                                <option value="90">1 hora e meia</option>
                                <option value="120">2 horas</option>
                                <option value="150">2 horas e meia</option>
                                <option value="180">3 horas</option>
                                <option value="210">3 horas e meia</option>
                                <option value="240">4 horas</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="tooltip" data-tip="Marcar atendimento">
                                <button
                                    id="btnVerificar"
                                    type="submit"
                                    className="btn btn-outline btn-success"
                                    aria-disabled="true"
                                >
                                    Verificar
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
                        isOpen={isClinicoOpen}
                        title="Pesquisar Clínico"
                        data={clinicoData || []}
                        columns={clinicoColumns}
                        onSelectItem={handleSelectClinico}
                        onClose={() => setIsClinicoOpen(false)}
                    />
                    {isSelecionaDiaOpen && 
                        <SelecionaDiaModal
                            isOpen={isSelecionaDiaOpen}
                            dias={diasData || []}
                            HandleSelectedDia={handleSelectedDiaModal}
                            onClose={() => setIsSelecionaDiaOpen(false)}
                        />
                    }
                </div>
            </dialog>
        </>
    );
}
