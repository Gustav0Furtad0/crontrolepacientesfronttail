import React, { useState, useEffect } from 'react';
import Usuarios from '../../scripts/usuarios';
import Modal from '../modals/addConsulta';
import Consultas from '../../scripts/consultas';
import GenericTable from '../visual/table';

export default function ConsultaDiaModal({ isOpen, onClose, date }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clinicos, setClinicos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedClinico, setSelectedClinico] = useState(null);
    const [consultas, setConsultas] = useState([]);
    const [timeLine, setTimeLine] = useState([]);

    const fetchClinicos = async () => {
        try {
            const result = await Usuarios.getUsersByType('clinico');
            setClinicos(result);
            if (result.length > 0) {
                setSelectedClinico(result[0].uid);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleClinicoChange = (event) => {
        setSelectedClinico(event.target.value);
    };

    const fetchConsultas = async () => {
        try {
            let formattedDate = new Date(selectedDate);
            formattedDate = `${formattedDate.getFullYear()}-${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedDate.getDate().toString().padStart(2, '0')}`;
            const queryParams = {
                clinicoId: selectedClinico,
                data: formattedDate
            };
            const result = await Consultas.getConsultas(queryParams);
            if (Array.isArray(result)) {
                result.reverse();
                console.log(result);
                setConsultas(Array.isArray(result) ? result : []);
                const timeLine = timeLineMaker(result);
                setTimeLine(timeLine);
            } else {
                setConsultas([]);
                setTimeLine([]);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const timeLineMaker = (data) => {
        let timeLine = [];
        let ultimaHoraFinal = '00:00';
        if (data.length === 0) {
            timeLine.push(
                <li>
                    <div className="timeline-start timeline-box border-2">Nenhum horário</div>
                </li>
            );
            return timeLine;
        }
        for (let i = 0; i < data.length; i++) {
            let consulta = data[i]
            let timeLineItem = ('');
            if (i === 0) {
                timeLineItem = (
                        <li>
                            <div className={`timeline-start timeline-box ${consulta.paciente.sexo === 'Masculino' ? 'text-blue-700' : consulta.paciente.sexo === "Feminino" ? 'text-pink-700' : ''}`}>{consulta.paciente.nome.split(' ')[0] + ' ' + consulta.paciente.nome.split(' ')[consulta.paciente.nome.split(' ').length - 1]}</div>
                            <div className="timeline-end">{consulta.dataInicio.split(' ')[1]}</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <hr className="bg-teal-500"/>
                        </li>
                );
                timeLine.push(timeLineItem);
                timeLineItem = (
                    <li>
                        <hr className="bg-teal-500"/>
                        <div className="timeline-end">{consulta.dataFim.split(' ')[1]} </div>
                        <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        {data.length === 1 ? '' : <hr/>}
                    </li>
                );
                timeLine.push(timeLineItem);
            } else if (i === data.length - 1) {
                if (ultimaHoraFinal !== consulta.dataInicio.split(' ')[1].trim()) {
                    timeLineItem = (
                        <li>
                            <hr/>
                            <div className="mt-6 mb-6 timeline-start timeline-box border-2">Horário Disponível</div>
                            <div className="timeline-end underline">{ultimaHoraFinal} ás {consulta.dataInicio.split(' ')[1]}</div>
                            <div className="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5  "><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                            </div>
                            <hr/>
                        </li>
                    );
                    timeLine.push(timeLineItem);
                }

                timeLineItem = (
                    <li>
                        <hr/>
                        <div className={`timeline-start timeline-box ${consulta.paciente.sexo === 'Masculino' ? 'text-blue-700' : consulta.paciente.sexo === "Feminino" ? 'text-pink-700' : ''}`}>{consulta.paciente.nome.split(' ')[0] + ' ' + consulta.paciente.nome.split(' ')[consulta.paciente.nome.split(' ').length - 1]}</div>
                        <div className="timeline-end">{consulta.dataInicio.split(' ')[1]}</div>
                        <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <hr className="bg-teal-500"/>
                    </li>
                );
                timeLine.push(timeLineItem);
                timeLineItem = (
                    <li>
                        <hr className="bg-teal-500"/>
                        <div className="timeline-end">{consulta.dataFim.split(' ')[1]} </div>
                        <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                    </li>
                );
                timeLine.push(timeLineItem);
            } else {
                if (ultimaHoraFinal !== consulta.dataInicio.split(' ')[1].trim()) {
                    timeLineItem = (
                        <li>
                            <hr/>
                            <div className="mt-6 mb-6 timeline-start timeline-box border-2">Horário Disponível</div>
                            <div className="timeline-end underline">{ultimaHoraFinal} ás {consulta.dataInicio.split(' ')[1]}</div>
                            <div className="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5  "><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                            </div>
                            <hr/>
                        </li>
                    );
                    timeLine.push(timeLineItem);
                }

                timeLineItem = (
                    <li>
                        <hr/>
                        <div className={`timeline-start timeline-box ${consulta.paciente.sexo === 'Masculino' ? 'text-blue-700' : consulta.paciente.sexo === "Feminino" ? 'text-pink-700' : ''}`}>{consulta.paciente.nome.split(' ')[0] + ' ' + consulta.paciente.nome.split(' ')[consulta.paciente.nome.split(' ').length - 1]}</div>
                        <div className="timeline-end">{consulta.dataInicio.split(' ')[1]}</div>
                        <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <hr className="bg-teal-500"/>
                    </li>
                );
                timeLine.push(timeLineItem);
                timeLineItem = (
                    <li>
                        <hr className="bg-teal-500"/>
                        <div className="timeline-end">{consulta.dataFim.split(' ')[1]} </div>
                        <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <hr/>
                    </li>
                );
                timeLine.push(timeLineItem);
            }

            ultimaHoraFinal = consulta.dataFim.split(' ')[1].trim();
        }
        return timeLine;
    }

    useEffect(() => {
        fetchClinicos();
    }, []);

    useEffect(() => {
        if (selectedClinico) {
            fetchConsultas();
        }
    }, [selectedClinico, selectedDate]);

    const convertDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const columns = [
        { key: 'pacienteNome', title: 'Paciente' },
        { key: 'clinicoNome', title: 'Clínico', render: (data) => data.split(' ')[0] + ' ' + data.split(' ')[data.split(' ').length - 1]},
        { key: 'tipoConsulta', title: 'Atendimento' },
        { key: 'dataInicio', title: 'Início', render: (data) => data.split(' ')[1] },
        { key: 'dataFim', title: 'Fim', render: (data) => data.split(' ')[1] },
        { key: 'edit', title: '', render: () => (
            <a
                href="/usuarioMenu"
                className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5"
                type="button"
            >
                Editar
            </a>
        ) },
    ];

    const tableData = consultas.map((consulta) => ({
        pacienteNome: consulta.paciente.nome,
        clinicoNome: consulta.clinico.nome,
        tipoConsulta: consulta.tipoConsulta,
        dataInicio: consulta.dataInicio,
        dataFim: consulta.dataFim,
    }));

    return (
        <dialog className="my-modal">
            <div className="modal-box w-6xl max-w-7xl">

                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Atendimentos {convertDate(date)}</h2>
                    <button className="text-black close-modal" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className='flex p-8'>

                    <div className="overflow-x-auto w-1/4" style={{ minWidth: 300}}>
                        <ul className="timeline timeline-vertical">
                            {timeLine}
                        </ul>
                    </div>

                    <div className="overflow-x-auto w-3/4">
                        <div className='flex justify-between border-b pb-4'>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={selectedClinico}
                                onChange={handleClinicoChange}
                            >
                                {clinicos.map((clinico) => (
                                    <option key={clinico.uid} value={clinico.uid}>
                                        {clinico.nomeCompleto}
                                    </option>
                                ))}
                            </select>

                            <button className="btn" 
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            >
                                Adicionar atendimento
                            </button>
                        </div>
                        <GenericTable
                            data={tableData}
                            columns={columns}
                            pageMax={5}
                        />
                    </div>
                </div>
                {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => {
                    setIsModalOpen(false)
                    fetchConsultas()
                }} />}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>  
        </dialog>
    );
}