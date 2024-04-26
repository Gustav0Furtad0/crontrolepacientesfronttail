import React, { useState, useEffect } from 'react';

import Usuarios from '../../scripts/usuarios';

import Modal from '../modals/addConsulta';

export default function ConsultaDiaModal({ isOpen, onClose, date }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clinicos, setClinicos] = useState([]); 

    const fetchClinicos = async () => {
        try {
            const result = await Usuarios.getUsersByType('clinico');
            setClinicos(result);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        fetchClinicos();
    }, []);

    // const [selectedDate, setSelectedDate] = React.useState(date);
    // const [selectedClinico, setSelectedClinico] = useState(null);

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };

    // const handleUserChange = (event) => {
    //     setSelectedClinico(event.target.value);
    // };

    // const handleConsultar = () => {
    //     console.log('Consultar:', selectedDate, selectedClinico);
    // };
    
    const convertDate = (date) => {
        // Converte a data para o formato 'dd/mm/yyyy'
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="absolute top-24 bg-white rounded shadow-lg w-3/4" style={{minHeight: '80%'}}>

                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Atendimentos {convertDate(date)}</h2>
                    <button className="text-black close-modal" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className='flex p-8'>

                    <div className="overflow-x-auto w-1/4">
                        <ul className="timeline timeline-vertical">

                            <li>
                                <div className="timeline-start timeline-box">Gustavo Furtado</div>
                                <div className="timeline-end">08:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <hr className="bg-teal-500"/>
                            </li>
                            <li>
                                <hr className="bg-teal-500"/>
                                <div className="timeline-end">09:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <hr/>
                            </li>

                            <li>
                                <hr/>
                                <div className="timeline-start timeline-box">Maria Salvarani</div>
                                <div className="timeline-end">09:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <hr className="bg-teal-500"/>
                            </li>
                            <li>
                                <hr className="bg-teal-500"/>
                                <div className="timeline-end">10:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <hr/>
                            </li>

                            <li>
                                <hr/>
                                <div className="mt-6 mb-6 timeline-start timeline-box border-2">Horário Disponível</div>
                                <div className="timeline-end underline">10:00 ás 14:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5  "><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <hr/>
                            </li>

                            <li>
                                <hr/>
                                <div className="timeline-start timeline-box">Ana Silva</div>
                                <div className="timeline-end">14:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <hr className="bg-teal-500"/>
                            </li>
                            <li>
                                <hr className="bg-teal-500"/>
                                <div className="timeline-end">15:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <hr/>
                            </li>

                            <li>
                                <hr/>
                                <div className="mt-6 mb-6 timeline-start timeline-box border-2">Horário Disponível</div>
                                <div className="timeline-end underline">15:00 ás 17:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5  "><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <hr/>
                            </li>

                            <li>
                                <hr/>
                                <div className="timeline-start timeline-box">Davi Pacheco</div>
                                <div className="timeline-end">17:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <hr className="bg-teal-500"/>
                            </li>
                            <li>
                                <hr className="bg-teal-500"/>
                                <div className="timeline-end">18:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-500"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <hr/>
                            </li>

                            <li>
                                <hr/>
                                <div className="mt-6 mb-6 timeline-start timeline-box border-2">Horário Disponível</div>
                                <div className="timeline-end underline">A partir de 18:00</div>
                                <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5  "><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="overflow-x-auto w-3/4">
                        <div className='flex justify-between border-b pb-4'>
                            <select className="select select-bordered w-full max-w-xs">
                                {clinicos.map((clinico) => (
                                    <option key={clinico.id} value={clinico.id}>{clinico.nomeCompleto}</option>
                                ))}
                            </select>

                            <button className="btn" 
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            >
                                Adicionar atendimento
                            </button>
                        </div>
                        <table className="table">
                            <thead className="text-xs text-gray-700 uppercase">
                                <tr>
                                    <th>Paciente</th>
                                    <th>Clínico</th>
                                    <th>Atendimento</th>
                                    <th>Inicío</th>
                                    <th>Fim</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Gustavo Furtado</th>
                                    <td>Eduardo Salvarani</td>
                                    <td>Orçamento</td>
                                    <td>08:00</td>
                                    <td>09:00</td>
                                    <td>
                                        <a  
                                            href="/usuarioMenu"
                                            className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                                            type="button"
                                        >
                                            Editar
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Maria Salvarani</th>
                                    <td>Eduardo Salvarani</td>
                                    <td>Atendimento Mensal</td>
                                    <td>09:00</td>
                                    <td>10:00</td>
                                    <td>
                                        <a  
                                            href="/usuarioMenu"
                                            className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                                            type="button"
                                        >
                                            Editar
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Ana Silva</th>
                                    <td>Eduardo Salvarani</td>
                                    <td>Cirurgia</td>
                                    <td>14:00</td>
                                    <td>15:00</td>
                                    <td>
                                        <a  
                                            href="/usuarioMenu"
                                            className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                                            type="button"
                                        >
                                            Editar
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Davi Pacheco</th>
                                    <td>Eduardo Salvarani</td>
                                    <td>Atendimento Mensal</td>
                                    <td>17:00</td>
                                    <td>18:00 </td>
                                    <td>
                                        <a  
                                            href="/usuarioMenu"
                                            className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                                            type="button"
                                        >
                                            Editar
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Mostrando <span className="font-semibold text-gray-900 dark:text-white">4</span> de <span className="font-semibold text-gray-900 dark:text-white">4</span> pacientes</span>
                            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                <li>
                                    <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</button>
                                </li>
                                <li>
                                    <button aria-current={undefined} className={`flex items-center justify-center px-3 h-8 leading-tight text-teal-500 border border-gray-300 bg-blue-50 hover:bg-teal-100 hover:text-teal-700'`}>
                                        1
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
            </div>  
        </div>
    );
}